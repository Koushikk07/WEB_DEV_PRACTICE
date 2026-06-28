# ws/handlers.py
# This file handles all incoming WebSocket messages.
# When a message arrives, we figure out what type it is
# and call the right function to handle it.

from sqlalchemy.orm import Session
from models import Message, Conversation, Participant, User
from ws.manager import manager
from datetime import datetime


# ── Handle incoming WebSocket message ──
async def handle_message(data: dict, user_id: str, db: Session):
    # Every WebSocket message must have a "type" field
    # We route to the correct handler based on type
    msg_type = data.get("type")
    payload  = data.get("payload", {})

    if msg_type == "join":
        # User wants to join a conversation room
        await handle_join(payload, user_id, db)

    elif msg_type == "message":
        # User sent a chat message
        await handle_chat_message(payload, user_id, db)

    elif msg_type == "typing":
        # User started or stopped typing
        await handle_typing(payload, user_id)

    elif msg_type == "read":
        # User read messages in a conversation
        await handle_read_receipt(payload, user_id, db)

    elif msg_type == "online":
        # User came online
        await handle_online_status(user_id, True, db)

    else:
        print(f"Unknown message type: {msg_type}")


# ── Handle join conversation ──
async def handle_join(payload: dict, user_id: str, db: Session):
    conversation_id = payload.get("conversation_id")
    if not conversation_id:
        return

    # Add user to the conversation room in our manager
    manager.join_conversation(user_id, conversation_id)

    # Tell the user they successfully joined
    await manager.send_to_user(user_id, {
        "type": "joined",
        "payload": {"conversation_id": conversation_id}
    })


# ── Handle chat message ──
async def handle_chat_message(payload: dict, user_id: str, db: Session):
    conversation_id = payload.get("conversation_id")
    content         = payload.get("content")
    reply_to_id     = payload.get("reply_to_id")

    if not conversation_id or not content:
        return

    # Verify sender is part of this conversation
    participant = db.query(Participant).filter(
        Participant.conversation_id == conversation_id,
        Participant.user_id         == user_id
    ).first()
    if not participant:
        return

    # Save message to database
    message = Message(
        conversation_id = conversation_id,
        sender_id       = user_id,
        content         = content,
        reply_to_id     = reply_to_id,
        status          = "sent",
    )
    db.add(message)

    # Update conversation last_message_at
    conv = db.query(Conversation).filter(
        Conversation.id == conversation_id
    ).first()
    if conv:
        conv.last_message_at = datetime.utcnow()

    db.commit()
    db.refresh(message)

    # Get sender info to include in the broadcast
    sender = db.query(User).filter(User.id == user_id).first()

    # Build the message payload to broadcast
    message_data = {
        "type": "message",
        "payload": {
            "id":              message.id,
            "conversation_id": message.conversation_id,
            "sender_id":       message.sender_id,
            "content":         message.content,
            "status":          message.status,
            "reply_to_id":     message.reply_to_id,
            "created_at":      message.created_at.isoformat(),
            "is_deleted":      message.is_deleted,
            "sender": {
                "id":           sender.id,
                "display_name": sender.display_name,
                "avatar_url":   sender.avatar_url,
                "phone_number": sender.phone_number,
            }
        }
    }

    # Send to everyone in the conversation including the sender
    await manager.broadcast_to_conversation(conversation_id, message_data)

    # Send delivery receipt back to sender
    await manager.send_to_user(user_id, {
        "type": "delivered",
        "payload": {
            "message_id":      message.id,
            "conversation_id": conversation_id,
            "status":          "delivered"
        }
    })


# ── Handle typing indicator ──
async def handle_typing(payload: dict, user_id: str):
    conversation_id = payload.get("conversation_id")
    is_typing       = payload.get("is_typing", False)

    if not conversation_id:
        return

    # Broadcast typing status to everyone EXCEPT the typer
    await manager.broadcast_to_conversation(
        conversation_id,
        {
            "type": "typing",
            "payload": {
                "user_id":         user_id,
                "conversation_id": conversation_id,
                "is_typing":       is_typing,
            }
        },
        exclude_user_id=user_id
    )


# ── Handle read receipts ──
async def handle_read_receipt(payload: dict, user_id: str, db: Session):
    conversation_id = payload.get("conversation_id")

    if not conversation_id:
        return

    # Update last_read_at for this participant
    participant = db.query(Participant).filter(
        Participant.conversation_id == conversation_id,
        Participant.user_id         == user_id
    ).first()
    if participant:
        participant.last_read_at = datetime.utcnow()
        db.commit()

    # Update all unread messages in this conversation to "read"
    unread_messages = db.query(Message).filter(
        Message.conversation_id == conversation_id,
        Message.sender_id       != user_id,
        Message.status          != "read"
    ).all()

    for msg in unread_messages:
        msg.status = "read"
    db.commit()

    # Notify the conversation that messages were read
    await manager.broadcast_to_conversation(
        conversation_id,
        {
            "type": "read",
            "payload": {
                "user_id":         user_id,
                "conversation_id": conversation_id,
            }
        },
        exclude_user_id=user_id
    )


# ── Handle online/offline status ──
async def handle_online_status(user_id: str, is_online: bool, db: Session):
    # Update database
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.is_online = is_online
        user.last_seen = datetime.utcnow()
        db.commit()

    # Broadcast to all connected users
    await manager.broadcast_to_all(
        {
            "type": "online_status",
            "payload": {
                "user_id":   user_id,
                "is_online": is_online,
            }
        },
        exclude_user_id=user_id
    )
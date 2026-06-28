# routers/messages.py
# Handles sending and fetching messages.

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Message, Conversation, Participant
from schemas import MessageCreateRequest, MessageResponse
from typing import List
from datetime import datetime

router = APIRouter()


# ── GET /api/messages/{conv_id} ──
# Get all messages in a conversation
@router.get("/{conv_id}", response_model=List[MessageResponse])
def get_messages(conv_id: str, db: Session = Depends(get_db)):
    messages = db.query(Message).filter(
        Message.conversation_id == conv_id,
        Message.is_deleted      == False
    ).order_by(Message.created_at.asc()).all()
    return messages


# ── POST /api/messages ──
# Send a new message
@router.post("/", response_model=MessageResponse)
def send_message(
    req: MessageCreateRequest,
    sender_id: str,
    db: Session = Depends(get_db)
):
    # Make sure the conversation exists
    conv = db.query(Conversation).filter(
        Conversation.id == req.conversation_id
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Make sure the sender is part of this conversation
    participant = db.query(Participant).filter(
        Participant.conversation_id == req.conversation_id,
        Participant.user_id         == sender_id
    ).first()
    if not participant:
        raise HTTPException(
            status_code=403,
            detail="You are not part of this conversation"
        )

    # Create the message
    message = Message(
        conversation_id = req.conversation_id,
        sender_id       = sender_id,
        content         = req.content,
        reply_to_id     = req.reply_to_id,
    )
    db.add(message)

    # Update the conversation's last_message_at timestamp
    conv.last_message_at = datetime.utcnow()
    db.commit()
    db.refresh(message)
    return message


# ── PUT /api/messages/{message_id}/status ──
# Update message status (delivered, read)
@router.put("/{message_id}/status")
def update_message_status(
    message_id: str,
    status: str,
    db: Session = Depends(get_db)
):
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.status     = status
    message.updated_at = datetime.utcnow()
    db.commit()
    return {"message": "Status updated"}


# ── DELETE /api/messages/{message_id} ──
# Soft delete a message (marks as deleted, does not remove from DB)
@router.delete("/{message_id}")
def delete_message(message_id: str, db: Session = Depends(get_db)):
    message = db.query(Message).filter(Message.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.is_deleted = True
    message.content    = "This message was deleted"
    db.commit()
    return {"message": "Message deleted"}
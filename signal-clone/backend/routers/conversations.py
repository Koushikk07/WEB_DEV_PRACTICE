# routers/conversations.py
# Handles creating and fetching conversations (direct and group).

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Conversation, Participant, Message, User
from schemas import (
    ConversationCreateRequest,
    ConversationResponse
)
from typing import List
from datetime import datetime

router = APIRouter()


# ── GET /api/conversations/user/{user_id} ──
# Get all conversations for a user
@router.get("/user/{user_id}", response_model=List[ConversationResponse])
def get_user_conversations(user_id: str, db: Session = Depends(get_db)):
    # Find all conversations this user is part of
    participations = db.query(Participant).filter(
        Participant.user_id == user_id
    ).all()

    conversations = []
    for p in participations:
        conv = p.conversation

        # Get the last message in this conversation
        last_msg = db.query(Message).filter(
            Message.conversation_id == conv.id,
            Message.is_deleted == False
        ).order_by(Message.created_at.desc()).first()

        # Count unread messages
        unread = db.query(Message).filter(
            Message.conversation_id == conv.id,
            Message.sender_id      != user_id,
            Message.created_at     >  p.last_read_at,
            Message.is_deleted     == False
        ).count()

        conv_data                = ConversationResponse.from_orm(conv)
        conv_data.last_message   = last_msg.content if last_msg else None
        conv_data.unread_count   = unread
        conversations.append(conv_data)

    # Sort by most recent message first
    conversations.sort(key=lambda x: x.last_message_at, reverse=True)
    return conversations


# ── POST /api/conversations/direct ──
# Create or get existing direct conversation between two users
@router.post("/direct", response_model=ConversationResponse)
def create_direct_conversation(
    req: ConversationCreateRequest,
    current_user_id: str,
    db: Session = Depends(get_db)
):
    # Check if a direct conversation already exists between these two users
    my_convs = db.query(Participant).filter(
        Participant.user_id == current_user_id
    ).all()
    my_conv_ids = [p.conversation_id for p in my_convs]

    for conv_id in my_conv_ids:
        conv = db.query(Conversation).filter(
            Conversation.id   == conv_id,
            Conversation.type == "direct"
        ).first()
        if conv:
            other = db.query(Participant).filter(
                Participant.conversation_id == conv_id,
                Participant.user_id         == req.participant_id
            ).first()
            if other:
                # Conversation already exists — return it
                return ConversationResponse.from_orm(conv)

    # Create new direct conversation
    conv = Conversation(
        type       = "direct",
        created_by = current_user_id,
    )
    db.add(conv)
    db.flush()

    # Add both users as participants
    for uid in [current_user_id, req.participant_id]:
        p = Participant(
            conversation_id = conv.id,
            user_id         = uid,
            is_admin        = False,
        )
        db.add(p)

    db.commit()
    db.refresh(conv)
    return ConversationResponse.from_orm(conv)


# ── GET /api/conversations/{conv_id} ──
# Get one conversation by ID
@router.get("/{conv_id}", response_model=ConversationResponse)
def get_conversation(conv_id: str, db: Session = Depends(get_db)):
    conv = db.query(Conversation).filter(
        Conversation.id == conv_id
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return ConversationResponse.from_orm(conv)
# routers/groups.py
# Handles group chat creation and member management.

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Conversation, Participant
from schemas import (
    GroupCreateRequest,
    GroupUpdateRequest,
    AddMembersRequest,
    RemoveMemberRequest,
    ConversationResponse
)
from datetime import datetime

router = APIRouter()


# ── POST /api/groups ──
# Create a new group chat
@router.post("/", response_model=ConversationResponse)
def create_group(
    req: GroupCreateRequest,
    creator_id: str,
    db: Session = Depends(get_db)
):
    # Create the group conversation
    group = Conversation(
        type       = "group",
        name       = req.name,
        avatar_url = req.avatar_url,
        created_by = creator_id,
    )
    db.add(group)
    db.flush()

    # Add creator as admin
    creator_participant = Participant(
        conversation_id = group.id,
        user_id         = creator_id,
        is_admin        = True,
    )
    db.add(creator_participant)

    # Add all other members
    for uid in req.member_ids:
        if uid != creator_id:
            p = Participant(
                conversation_id = group.id,
                user_id         = uid,
                is_admin        = False,
            )
            db.add(p)

    db.commit()
    db.refresh(group)
    return ConversationResponse.from_orm(group)


# ── PUT /api/groups/{group_id} ──
# Update group name or avatar
@router.put("/{group_id}", response_model=ConversationResponse)
def update_group(
    group_id: str,
    req: GroupUpdateRequest,
    db: Session = Depends(get_db)
):
    group = db.query(Conversation).filter(
        Conversation.id   == group_id,
        Conversation.type == "group"
    ).first()
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    if req.name is not None:
        group.name = req.name
    if req.avatar_url is not None:
        group.avatar_url = req.avatar_url

    db.commit()
    db.refresh(group)
    return ConversationResponse.from_orm(group)


# ── POST /api/groups/{group_id}/members ──
# Add members to a group
@router.post("/{group_id}/members")
def add_members(
    group_id: str,
    req: AddMembersRequest,
    db: Session = Depends(get_db)
):
    for uid in req.user_ids:
        # Check if already a member
        existing = db.query(Participant).filter(
            Participant.conversation_id == group_id,
            Participant.user_id         == uid
        ).first()
        if not existing:
            p = Participant(
                conversation_id = group_id,
                user_id         = uid,
                is_admin        = False,
            )
            db.add(p)
    db.commit()
    return {"message": "Members added successfully"}


# ── DELETE /api/groups/{group_id}/members ──
# Remove a member from a group
@router.delete("/{group_id}/members")
def remove_member(
    group_id: str,
    req: RemoveMemberRequest,
    db: Session = Depends(get_db)
):
    participant = db.query(Participant).filter(
        Participant.conversation_id == group_id,
        Participant.user_id         == req.user_id
    ).first()
    if not participant:
        raise HTTPException(status_code=404, detail="Member not found")

    db.delete(participant)
    db.commit()
    return {"message": "Member removed successfully"}
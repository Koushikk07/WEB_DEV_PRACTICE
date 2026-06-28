# schemas.py
# Pydantic schemas define the shape of data for API requests and responses.
# Think of them as contracts — the API only accepts and returns this exact shape.
# They are separate from models.py (which defines database tables).

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# ─────────────────────────────────────────────
# AUTH SCHEMAS
# ─────────────────────────────────────────────

class RegisterRequest(BaseModel):
    # What the frontend sends when a user registers
    phone_number: str
    password: str
    display_name: str
    avatar_url: Optional[str] = None


class LoginRequest(BaseModel):
    # What the frontend sends when a user logs in
    phone_number: str
    password: str


class OTPVerifyRequest(BaseModel):
    # Mock OTP — always 1234
    phone_number: str
    otp: str


class TokenResponse(BaseModel):
    # What the backend sends back after successful login
    access_token: str
    token_type: str = "bearer"
    user_id: str
    display_name: str
    phone_number: str
    avatar_url: Optional[str] = None


# ─────────────────────────────────────────────
# USER SCHEMAS
# ─────────────────────────────────────────────

class UserBase(BaseModel):
    # Shared fields used in multiple schemas
    phone_number: str
    display_name: str
    avatar_url: Optional[str] = None
    about: Optional[str] = None


class UserResponse(UserBase):
    # What the API returns when someone asks for user info
    # Never includes password_hash
    id: str
    is_online: bool
    last_seen: datetime
    created_at: datetime

    class Config:
        # This allows SQLAlchemy models to be converted to Pydantic schemas
        from_attributes = True


class UserUpdateRequest(BaseModel):
    # What the frontend sends to update profile
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    about: Optional[str] = None


# ─────────────────────────────────────────────
# CONVERSATION SCHEMAS
# ─────────────────────────────────────────────

class ParticipantResponse(BaseModel):
    # Info about one participant in a conversation
    id: str
    user_id: str
    conversation_id: str
    is_admin: bool
    joined_at: datetime
    user: UserResponse

    class Config:
        from_attributes = True


class ConversationCreateRequest(BaseModel):
    # Creating a direct chat — just need the other user's ID
    participant_id: str


class GroupCreateRequest(BaseModel):
    # Creating a group chat
    name: str
    member_ids: List[str]
    avatar_url: Optional[str] = None


class ConversationResponse(BaseModel):
    # What the API returns for a conversation
    id: str
    type: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    created_by: str
    created_at: datetime
    last_message_at: datetime
    participants: List[ParticipantResponse] = []
    last_message: Optional[str] = None
    unread_count: int = 0

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────
# MESSAGE SCHEMAS
# ─────────────────────────────────────────────

class MessageCreateRequest(BaseModel):
    # What the frontend sends to create a new message
    conversation_id: str
    content: str
    reply_to_id: Optional[str] = None


class MessageResponse(BaseModel):
    # What the API returns for a message
    id: str
    conversation_id: str
    sender_id: str
    content: str
    status: str
    is_deleted: bool
    reply_to_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    sender: UserResponse

    class Config:
        from_attributes = True


class MessageUpdateRequest(BaseModel):
    # Update message status (delivered, read etc.)
    status: str


# ─────────────────────────────────────────────
# WEBSOCKET SCHEMAS
# These are the shapes of messages sent over WebSocket
# ─────────────────────────────────────────────

class WSMessage(BaseModel):
    # Every WebSocket message has a type and a payload
    type: str          # "message", "typing", "read", "online"
    payload: dict


# ─────────────────────────────────────────────
# GROUP SCHEMAS
# ─────────────────────────────────────────────

class GroupUpdateRequest(BaseModel):
    # Update group name or avatar
    name: Optional[str] = None
    avatar_url: Optional[str] = None


class AddMembersRequest(BaseModel):
    # Add new members to a group
    user_ids: List[str]


class RemoveMemberRequest(BaseModel):
    # Remove a member from a group
    user_id: str
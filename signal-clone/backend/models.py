# models.py
# This file defines all database tables using SQLAlchemy ORM.
# Each class = one table in the database.
# SQLAlchemy will automatically create these tables when the server starts.

from sqlalchemy import (
    Column, String, Boolean, DateTime, 
    ForeignKey, Text, Enum
)
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
import uuid
import enum


# ─────────────────────────────────────────────
# Helper function to generate unique IDs
# We use UUID instead of 1,2,3... for security
# ─────────────────────────────────────────────
def generate_uuid():
    return str(uuid.uuid4())


# ─────────────────────────────────────────────
# Enum for message status
# This restricts the value to only these options
# ─────────────────────────────────────────────
class MessageStatus(str, enum.Enum):
    sending   = "sending"
    sent      = "sent"
    delivered = "delivered"
    read      = "read"


# ─────────────────────────────────────────────
# TABLE 1: users
# Stores every registered user
# ─────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    # Primary key — unique ID for each user
    id = Column(String, primary_key=True, default=generate_uuid)

    # Phone number or username used to register
    phone_number = Column(String, unique=True, nullable=False, index=True)

    # Display name shown in conversations
    display_name = Column(String, nullable=False)

    # Hashed password (we never store plain text passwords)
    password_hash = Column(String, nullable=False)

    # Profile picture — stored as a URL or base64 string
    avatar_url = Column(String, nullable=True)

    # About/bio text like "Hey there! I am using Signal."
    about = Column(String, default="Hey there! I am using Signal.")

    # Is the user currently online?
    is_online = Column(Boolean, default=False)

    # When did the user last open the app
    last_seen = Column(DateTime, default=datetime.utcnow)

    # When was this account created
    created_at = Column(DateTime, default=datetime.utcnow)

    # ── Relationships ──
    # One user can be in many conversations (through participants table)
    participations = relationship("Participant", back_populates="user")

    # One user can send many messages
    messages = relationship("Message", back_populates="sender")


# ─────────────────────────────────────────────
# TABLE 2: conversations
# Stores both direct (1-on-1) and group chats
# ─────────────────────────────────────────────
class Conversation(Base):
    __tablename__ = "conversations"

    # Primary key
    id = Column(String, primary_key=True, default=generate_uuid)

    # "direct" = one-on-one chat, "group" = group chat
    type = Column(Enum("direct", "group", name="conv_type"), nullable=False)

    # Only used for group chats — null for direct chats
    name = Column(String, nullable=True)

    # Group profile picture — null for direct chats
    avatar_url = Column(String, nullable=True)

    # Who created this conversation
    created_by = Column(String, ForeignKey("users.id"), nullable=False)

    # When was this conversation created
    created_at = Column(DateTime, default=datetime.utcnow)

    # When was the last message sent (used for sorting conversation list)
    last_message_at = Column(DateTime, default=datetime.utcnow)

    # ── Relationships ──
    # One conversation has many participants
    participants = relationship("Participant", back_populates="conversation")

    # One conversation has many messages
    messages = relationship("Message", back_populates="conversation")


# ─────────────────────────────────────────────
# TABLE 3: participants
# This is the JOIN table between users and conversations.
# It tells us which users are in which conversations.
# Example: User A and User B are both in Conversation 1
# ─────────────────────────────────────────────
class Participant(Base):
    __tablename__ = "participants"

    # Primary key
    id = Column(String, primary_key=True, default=generate_uuid)

    # Which conversation this participant belongs to
    conversation_id = Column(
        String, ForeignKey("conversations.id"), nullable=False, index=True
    )

    # Which user is the participant
    user_id = Column(
        String, ForeignKey("users.id"), nullable=False, index=True
    )

    # Is this user an admin of the group?
    # Only relevant for group chats
    is_admin = Column(Boolean, default=False)

    # When did this user join the conversation
    joined_at = Column(DateTime, default=datetime.utcnow)

    # When did this user last read messages in this conversation
    # Used to calculate unread message count
    last_read_at = Column(DateTime, default=datetime.utcnow)

    # ── Relationships ──
    conversation = relationship("Conversation", back_populates="participants")
    user = relationship("User", back_populates="participations")


# ─────────────────────────────────────────────
# TABLE 4: messages
# Stores every message sent in any conversation
# ─────────────────────────────────────────────
class Message(Base):
    __tablename__ = "messages"

    # Primary key
    id = Column(String, primary_key=True, default=generate_uuid)

    # Which conversation this message belongs to
    conversation_id = Column(
        String, ForeignKey("conversations.id"), nullable=False, index=True
    )

    # Who sent this message
    sender_id = Column(
        String, ForeignKey("users.id"), nullable=False, index=True
    )

    # The actual text content of the message
    content = Column(Text, nullable=False)

    # Message delivery status: sending → sent → delivered → read
    status = Column(
        Enum(MessageStatus, name="message_status"),
        default=MessageStatus.sent
    )

    # Is this message deleted?
    is_deleted = Column(Boolean, default=False)

    # If this is a reply, which message is it replying to?
    reply_to_id = Column(String, ForeignKey("messages.id"), nullable=True)

    # When was this message sent
    created_at = Column(DateTime, default=datetime.utcnow)

    # When was this message last edited
    updated_at = Column(DateTime, default=datetime.utcnow)

    # ── Relationships ──
    conversation = relationship("Conversation", back_populates="messages")
    sender = relationship("User", back_populates="messages")

    # Self-referential relationship for reply-to feature
    reply_to = relationship("Message", remote_side="Message.id")
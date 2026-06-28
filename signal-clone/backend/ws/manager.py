# ws/manager.py
# This file manages all active WebSocket connections.
# No imports from our own ws folder here — that caused the circular import.

from fastapi import WebSocket
from typing import Dict, List
import json


class ConnectionManager:
    def __init__(self):
        # Dictionary mapping user_id to their WebSocket connection
        self.active_connections: Dict[str, WebSocket] = {}

        # Dictionary mapping conversation_id to list of user_ids
        self.conversation_members: Dict[str, List[str]] = {}

    # ── Connect a user ──
    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"User {user_id} connected. Total: {len(self.active_connections)}")

    # ── Disconnect a user ──
    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

        for conv_id in self.conversation_members:
            if user_id in self.conversation_members[conv_id]:
                self.conversation_members[conv_id].remove(user_id)

        print(f"User {user_id} disconnected. Total: {len(self.active_connections)}")

    # ── Join a conversation room ──
    def join_conversation(self, user_id: str, conversation_id: str):
        if conversation_id not in self.conversation_members:
            self.conversation_members[conversation_id] = []
        if user_id not in self.conversation_members[conversation_id]:
            self.conversation_members[conversation_id].append(user_id)

    # ── Send message to one specific user ──
    async def send_to_user(self, user_id: str, message: dict):
        if user_id in self.active_connections:
            websocket = self.active_connections[user_id]
            try:
                await websocket.send_text(json.dumps(message))
            except Exception as e:
                print(f"Error sending to user {user_id}: {e}")
                self.disconnect(user_id)

    # ── Send message to everyone in a conversation ──
    async def broadcast_to_conversation(
        self,
        conversation_id: str,
        message: dict,
        exclude_user_id: str = None
    ):
        members = self.conversation_members.get(conversation_id, [])
        for user_id in members:
            if exclude_user_id and user_id == exclude_user_id:
                continue
            await self.send_to_user(user_id, message)

    # ── Send message to all connected users ──
    async def broadcast_to_all(self, message: dict, exclude_user_id: str = None):
        for user_id in list(self.active_connections.keys()):
            if exclude_user_id and user_id == exclude_user_id:
                continue
            try:
                ws = self.active_connections[user_id]
                await ws.send_text(json.dumps(message))
            except Exception as e:
                print(f"Error broadcasting to {user_id}: {e}")
                self.disconnect(user_id)

    # ── Check if a user is online ──
    def is_online(self, user_id: str) -> bool:
        return user_id in self.active_connections

    # ── Get all online user IDs ──
    def get_online_users(self) -> List[str]:
        return list(self.active_connections.keys())


# Single global instance — shared across the entire app
manager = ConnectionManager()
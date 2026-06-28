# main.py
# Entry point of our FastAPI backend.
# Now includes the WebSocket endpoint for real-time messaging.

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from ws.manager import manager
from ws.handlers import handle_message, handle_online_status
import models  # noqa: F401
import json

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Signal Clone API",
    description="Backend for Signal Messenger Clone",
    version="1.0.0"
)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and register all routers
from routers import auth, users, conversations, messages, groups  # noqa: E402

app.include_router(auth.router,          prefix="/api/auth",          tags=["Authentication"])
app.include_router(users.router,         prefix="/api/users",         tags=["Users"])
app.include_router(conversations.router, prefix="/api/conversations",  tags=["Conversations"])
app.include_router(messages.router,      prefix="/api/messages",       tags=["Messages"])
app.include_router(groups.router,        prefix="/api/groups",         tags=["Groups"])


# ── Health check ──
@app.get("/")
def root():
    return {"status": "Signal Clone API is running"}


# ── WebSocket endpoint ──
# Each user connects with their user_id in the URL
# Example: ws://localhost:8000/ws/user-123
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    # Connect the user
    await manager.connect(websocket, user_id)

    # Get a database session for this connection
    db = SessionLocal()

    try:
        # Broadcast that this user is now online
        await handle_online_status(user_id, True, db)

        # Keep listening for messages from this user
        while True:
            # Wait for a message from the client
            raw_data = await websocket.receive_text()

            try:
                # Parse the JSON message
                data = json.loads(raw_data)
                # Route to the correct handler
                await handle_message(data, user_id, db)
            except json.JSONDecodeError:
                # If message is not valid JSON ignore it
                print(f"Invalid JSON from user {user_id}: {raw_data}")

    except WebSocketDisconnect:
        # User disconnected (closed browser, lost internet etc.)
        manager.disconnect(user_id)
        await handle_online_status(user_id, False, db)
        print(f"User {user_id} disconnected")

    finally:
        # Always close the database session
        db.close()
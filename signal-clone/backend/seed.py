# seed.py
# This script fills the database with sample data.
# Run it once after setting up the backend.
# It creates 5 users, direct conversations, a group chat, and sample messages.

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, Base
from models import User, Conversation, Participant, Message
from passlib.context import CryptContext
from datetime import datetime, timedelta
import uuid

# Create all tables first
Base.metadata.create_all(bind=engine)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def generate_uuid() -> str:
    return str(uuid.uuid4())

def seed():
    db = SessionLocal()

    try:
        # ── Check if already seeded ──
        existing = db.query(User).first()
        if existing:
            print("Database already has data. Skipping seed.")
            print("To reseed delete signal.db and run again.")
            return

        print("Seeding database...")

        # ─────────────────────────────────────────────
        # CREATE 5 SAMPLE USERS
        # All passwords are: password123
        # ─────────────────────────────────────────────
        users_data = [
            {
                "id":           generate_uuid(),
                "phone_number": "+1234567890",
                "display_name": "Alice Johnson",
                "about":        "Hey there! I am using Signal.",
                "avatar_url":   "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
                "is_online":    True,
            },
            {
                "id":           generate_uuid(),
                "phone_number": "+1234567891",
                "display_name": "Bob Smith",
                "about":        "Available",
                "avatar_url":   "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
                "is_online":    False,
            },
            {
                "id":           generate_uuid(),
                "phone_number": "+1234567892",
                "display_name": "Carol White",
                "about":        "Busy",
                "avatar_url":   "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
                "is_online":    True,
            },
            {
                "id":           generate_uuid(),
                "phone_number": "+1234567893",
                "display_name": "David Brown",
                "about":        "At the gym",
                "avatar_url":   "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
                "is_online":    False,
            },
            {
                "id":           generate_uuid(),
                "phone_number": "+1234567894",
                "display_name": "Eva Martinez",
                "about":        "In a meeting",
                "avatar_url":   "https://api.dicebear.com/7.x/avataaars/svg?seed=Eva",
                "is_online":    True,
            },
        ]

        users = []
        for u in users_data:
            user = User(
                id            = u["id"],
                phone_number  = u["phone_number"],
                display_name  = u["display_name"],
                about         = u["about"],
                avatar_url    = u["avatar_url"],
                is_online     = u["is_online"],
                password_hash = hash_password("password123"),
                last_seen     = datetime.utcnow(),
                created_at    = datetime.utcnow(),
            )
            db.add(user)
            users.append(user)

        db.flush()
        print(f"Created {len(users)} users")

        # ─────────────────────────────────────────────
        # CREATE DIRECT CONVERSATIONS
        # Alice ↔ Bob
        # Alice ↔ Carol
        # Bob   ↔ Carol
        # ─────────────────────────────────────────────
        alice  = users[0]
        bob    = users[1]
        carol  = users[2]
        david  = users[3]
        eva    = users[4]

        direct_pairs = [
            (alice, bob),
            (alice, carol),
            (bob,   carol),
            (alice, david),
            (alice, eva),
        ]

        direct_convs = []
        for user_a, user_b in direct_pairs:
            conv = Conversation(
                id              = generate_uuid(),
                type            = "direct",
                created_by      = user_a.id,
                created_at      = datetime.utcnow(),
                last_message_at = datetime.utcnow(),
            )
            db.add(conv)
            db.flush()

            # Add both users as participants
            for u in [user_a, user_b]:
                p = Participant(
                    id              = generate_uuid(),
                    conversation_id = conv.id,
                    user_id         = u.id,
                    is_admin        = False,
                    joined_at       = datetime.utcnow(),
                    last_read_at    = datetime.utcnow(),
                )
                db.add(p)

            direct_convs.append((conv, user_a, user_b))

        print(f"Created {len(direct_convs)} direct conversations")

        # ─────────────────────────────────────────────
        # CREATE GROUP CONVERSATION
        # "Signal Dev Team" with all 5 users
        # ─────────────────────────────────────────────
        group_conv = Conversation(
            id              = generate_uuid(),
            type            = "group",
            name            = "Signal Dev Team",
            avatar_url      = "https://api.dicebear.com/7.x/identicon/svg?seed=DevTeam",
            created_by      = alice.id,
            created_at      = datetime.utcnow(),
            last_message_at = datetime.utcnow(),
        )
        db.add(group_conv)
        db.flush()

        for i, u in enumerate(users):
            p = Participant(
                id              = generate_uuid(),
                conversation_id = group_conv.id,
                user_id         = u.id,
                is_admin        = (i == 0),  # Alice is admin
                joined_at       = datetime.utcnow(),
                last_read_at    = datetime.utcnow(),
            )
            db.add(p)

        print("Created 1 group conversation")

        # ─────────────────────────────────────────────
        # CREATE SAMPLE MESSAGES
        # ─────────────────────────────────────────────

        def add_message(conv_id, sender_id, content, minutes_ago, status="read"):
            msg = Message(
                id              = generate_uuid(),
                conversation_id = conv_id,
                sender_id       = sender_id,
                content         = content,
                status          = status,
                is_deleted      = False,
                created_at      = datetime.utcnow() - timedelta(minutes=minutes_ago),
                updated_at      = datetime.utcnow() - timedelta(minutes=minutes_ago),
            )
            db.add(msg)
            return msg

        # ── Alice ↔ Bob messages ──
        conv_ab = direct_convs[0][0]
        add_message(conv_ab.id, alice.id, "Hey Bob! How are you doing?",          60, "read")
        add_message(conv_ab.id, bob.id,   "Hi Alice! I am doing great, thanks!",  58, "read")
        add_message(conv_ab.id, alice.id, "Did you check the new Signal features?", 55, "read")
        add_message(conv_ab.id, bob.id,   "Yes! The new UI looks amazing.",        50, "read")
        add_message(conv_ab.id, alice.id, "I know right? Super clean design.",     45, "read")
        add_message(conv_ab.id, bob.id,   "Are you free for a call later?",        30, "read")
        add_message(conv_ab.id, alice.id, "Sure! Let us connect at 5pm.",          20, "read")
        add_message(conv_ab.id, bob.id,   "Perfect. Talk to you then!",            10, "delivered")
        add_message(conv_ab.id, alice.id, "👍",                                     5, "sent")
        conv_ab.last_message_at = datetime.utcnow() - timedelta(minutes=5)

        # ── Alice ↔ Carol messages ──
        conv_ac = direct_convs[1][0]
        add_message(conv_ac.id, carol.id, "Alice are you coming to the meeting?",  120, "read")
        add_message(conv_ac.id, alice.id, "Yes! Be there in 10 minutes.",          118, "read")
        add_message(conv_ac.id, carol.id, "Great! I saved you a seat.",            115, "read")
        add_message(conv_ac.id, alice.id, "You are the best Carol!",               110, "read")
        add_message(conv_ac.id, carol.id, "Haha anytime. See you soon!",           105, "read")
        add_message(conv_ac.id, alice.id, "Just parked. Coming up now.",            40, "read")
        add_message(conv_ac.id, carol.id, "The meeting just started.",              35, "delivered")
        conv_ac.last_message_at = datetime.utcnow() - timedelta(minutes=35)

        # ── Bob ↔ Carol messages ──
        conv_bc = direct_convs[2][0]
        add_message(conv_bc.id, bob.id,   "Carol did you finish the report?",      200, "read")
        add_message(conv_bc.id, carol.id, "Almost done. Sending it in an hour.",   195, "read")
        add_message(conv_bc.id, bob.id,   "No rush. Take your time.",              190, "read")
        add_message(conv_bc.id, carol.id, "Report sent! Check your email.",        130, "read")
        add_message(conv_bc.id, bob.id,   "Got it. Looks good!",                   125, "delivered")
        conv_bc.last_message_at = datetime.utcnow() - timedelta(minutes=125)

        # ── Alice ↔ David messages ──
        conv_ad = direct_convs[3][0]
        add_message(conv_ad.id, david.id, "Hey Alice! Long time no chat.",         300, "read")
        add_message(conv_ad.id, alice.id, "David! How have you been?",             295, "read")
        add_message(conv_ad.id, david.id, "Really good! Started a new job.",       290, "read")
        add_message(conv_ad.id, alice.id, "That is awesome! Congratulations!",     285, "read")
        add_message(conv_ad.id, david.id, "Thanks! We should catch up soon.",      280, "delivered")
        conv_ad.last_message_at = datetime.utcnow() - timedelta(minutes=280)

        # ── Alice ↔ Eva messages ──
        conv_ae = direct_convs[4][0]
        add_message(conv_ae.id, eva.id,   "Alice can you review my PR?",            90, "read")
        add_message(conv_ae.id, alice.id, "Sure! Sending comments now.",            85, "read")
        add_message(conv_ae.id, eva.id,   "Thanks! Fixed all the issues.",          80, "read")
        add_message(conv_ae.id, alice.id, "Looks great! Approved and merged.",      75, "read")
        add_message(conv_ae.id, eva.id,   "You are amazing Alice, thank you!",      70, "delivered")
        conv_ae.last_message_at = datetime.utcnow() - timedelta(minutes=70)

        # ── Group messages ──
        add_message(group_conv.id, alice.id, "Welcome everyone to Signal Dev Team!", 180, "read")
        add_message(group_conv.id, bob.id,   "Thanks for adding me Alice!",          175, "read")
        add_message(group_conv.id, carol.id, "Excited to be here!",                  170, "read")
        add_message(group_conv.id, david.id, "Hey team! Ready to build something great.", 165, "read")
        add_message(group_conv.id, eva.id,   "Let us do this!",                      160, "read")
        add_message(group_conv.id, alice.id, "First task — build the Signal clone!", 155, "read")
        add_message(group_conv.id, bob.id,   "On it! Starting with the backend.",    150, "read")
        add_message(group_conv.id, carol.id, "I will handle the frontend.",          145, "read")
        add_message(group_conv.id, david.id, "I will do the database design.",       140, "read")
        add_message(group_conv.id, eva.id,   "WebSockets are my territory!",         135, "read")
        add_message(group_conv.id, alice.id, "Perfect split. Let us ship it! 🚀",    130, "read")
        add_message(group_conv.id, bob.id,   "Backend is 80% done.",                  15, "delivered")
        add_message(group_conv.id, carol.id, "Frontend looks just like Signal!",      10, "delivered")
        add_message(group_conv.id, alice.id, "Amazing work team! 🎉",                  2, "sent")
        group_conv.last_message_at = datetime.utcnow() - timedelta(minutes=2)

        # Save everything to database
        db.commit()

        print("Seed complete! Here are the test accounts:")
        print("─" * 50)
        for u in users_data:
            print(f"Phone: {u['phone_number']}  Name: {u['display_name']}")
        print("─" * 50)
        print("Password for all accounts: password123")
        print("─" * 50)

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    seed()
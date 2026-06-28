# routers/auth.py
# Handles user registration and login.
# OTP is always 1234 (mocked).

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import (
    RegisterRequest, LoginRequest,
    OTPVerifyRequest, TokenResponse
)
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Password hashing setup
# bcrypt is a secure one-way hashing algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey123456789abcdef")
ALGORITHM  = os.getenv("ALGORITHM", "HS256")
EXPIRE_MIN = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10080))

MOCK_OTP = "1234"


def hash_password(password: str) -> str:
    # Convert plain text password to a secure hash
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    # Check if plain password matches the stored hash
    return pwd_context.verify(plain, hashed)


def create_token(user_id: str) -> str:
    # Create a JWT token that expires after EXPIRE_MIN minutes
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MIN)
    data   = {"sub": user_id, "exp": expire}
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


# ── POST /api/auth/register ──
@router.post("/register", response_model=TokenResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    # Check if phone number is already taken
    existing = db.query(User).filter(
        User.phone_number == req.phone_number
    ).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Phone number already registered"
        )

    # Create new user with hashed password
    user = User(
        phone_number  = req.phone_number,
        display_name  = req.display_name,
        password_hash = hash_password(req.password),
        avatar_url    = req.avatar_url,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Return token so user is logged in immediately after registering
    token = create_token(user.id)
    return TokenResponse(
        access_token = token,
        user_id      = user.id,
        display_name = user.display_name,
        phone_number = user.phone_number,
        avatar_url   = user.avatar_url,
    )


# ── POST /api/auth/verify-otp ──
@router.post("/verify-otp")
def verify_otp(req: OTPVerifyRequest):
    # Mock OTP verification — always accept 1234
    if req.otp != MOCK_OTP:
        raise HTTPException(status_code=400, detail="Invalid OTP. Use 1234")
    return {"message": "OTP verified successfully"}


# ── POST /api/auth/login ──
@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    # Find user by phone number
    user = db.query(User).filter(
        User.phone_number == req.phone_number
    ).first()

    # Check user exists and password is correct
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid phone number or password"
        )

    # Mark user as online
    user.is_online = True
    user.last_seen = datetime.utcnow()
    db.commit()

    token = create_token(user.id)
    return TokenResponse(
        access_token = token,
        user_id      = user.id,
        display_name = user.display_name,
        phone_number = user.phone_number,
        avatar_url   = user.avatar_url,
    )


# ── POST /api/auth/logout ──
@router.post("/logout")
def logout(user_id: str, db: Session = Depends(get_db)):
    # Mark user as offline
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.is_online = False
        user.last_seen = datetime.utcnow()
        db.commit()
    return {"message": "Logged out successfully"}
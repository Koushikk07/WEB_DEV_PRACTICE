# routers/users.py
# Handles fetching and updating user profiles.

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserResponse, UserUpdateRequest
from typing import List

router = APIRouter()


# ── GET /api/users ──
# Get all users (for adding contacts)
@router.get("/", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


# ── GET /api/users/{user_id} ──
# Get one user by ID
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ── PUT /api/users/{user_id} ──
# Update user profile
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    req: UserUpdateRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Only update fields that were provided
    if req.display_name is not None:
        user.display_name = req.display_name
    if req.avatar_url is not None:
        user.avatar_url = req.avatar_url
    if req.about is not None:
        user.about = req.about

    db.commit()
    db.refresh(user)
    return user


# ── GET /api/users/search/{query} ──
# Search users by phone number or display name
@router.get("/search/{query}", response_model=List[UserResponse])
def search_users(query: str, db: Session = Depends(get_db)):
    users = db.query(User).filter(
        (User.phone_number.contains(query)) |
        (User.display_name.contains(query))
    ).all()
    return users
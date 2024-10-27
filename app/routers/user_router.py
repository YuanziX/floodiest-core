from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import UserOut
from app.base import get_db
from app.services.user_service import create_user, get_user_by_username
from app.auth.auth import create_access_token, verify_password
from datetime import timedelta
from typing import Dict

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register_user(user: Dict[str, str], db: Session = Depends(get_db)):
    username = user.get("username")
    email = user.get("email")
    password = user.get("password")
    fcm_token = "1223456"

    if not username or not email or not password:
        raise HTTPException(status_code=400, detail="Missing fields")

    db_user = get_user_by_username(db, username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    return create_user(db, username, email, password, fcm_token)

@router.post("/token")
def login_for_access_token(form_data: Dict[str, str], db: Session = Depends(get_db)):
    username = form_data.get("username")
    password = form_data.get("password")

    if not username or not password:
        raise HTTPException(status_code=400, detail="Missing fields")

    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password, user.fcm_token):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}

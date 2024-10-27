from typing import List
from sqlalchemy.orm import Session, joinedload
from app.models import User
from app.auth.auth import get_password_hash

def create_user(db: Session, username: str, email: str, password: str, fcm_token: str):
    hashed_password = get_password_hash(password)
    db_user = User(username=username, email=email, hashed_password=hashed_password, fcm_token=fcm_token)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_users_with_addresses(db: Session) -> List[User]:
    users = db.query(User).options(joinedload(User.addresses)).all()
    return users
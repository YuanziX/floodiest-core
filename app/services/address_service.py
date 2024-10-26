from sqlalchemy.orm import Session
from app.models import Address

def create_address(db: Session, street: str, city: str, state: str, zip_code: str, user_id: int):
    db_address = Address(street=street, city=city, state=state, zip_code=zip_code, user_id=user_id)
    db.add(db_address)
    db.commit()
    db.refresh(db_address)
    return db_address

def get_addresses_by_user(db: Session, user_id: int):
    return db.query(Address).filter(Address.user_id == user_id).all()
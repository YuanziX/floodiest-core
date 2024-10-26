from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import AddressCreate, AddressOut
from app.database import get_db
from app.services.address_service import create_address
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.post("/addresses/", response_model=AddressOut)
def add_address(address: AddressCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return create_address(db, address.street, address.city, address.state, address.zip_code, current_user.id)

@router.get("/addresses/", response_model=list[AddressOut])
def get_addresses(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return current_user.addresses
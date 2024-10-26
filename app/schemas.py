from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class AddressCreate(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str

class AddressOut(BaseModel):
    id: int
    street: str
    city: str
    state: str
    zip_code: str

    class Config:
        orm_mode = True

from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    fcm_token: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class AddressCreate(BaseModel):
    latitude: float
    longitude: float

class AddressOut(BaseModel):
    id: int
    latitude: float
    longitude: float

    class Config:
        orm_mode = True

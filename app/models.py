from sqlalchemy import Column, Float, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    addresses = relationship("Address", back_populates="owner")

class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    street = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="addresses")

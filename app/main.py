from fastapi import FastAPI
from app.routers import user_router, address_router
from app.database import engine
from app.models import Base

# Create all tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Include routers
app.include_router(user_router.router)
app.include_router(address_router.router)

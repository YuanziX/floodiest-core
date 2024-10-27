import ee
from fastapi import FastAPI
from app.routers import user_router, address_router
from fastapi.middleware.cors import CORSMiddleware

from app.services.flood_monitoring_service import run_flood_monitoring, start_flood_monitoring_service
from app.base import Base, get_db

ee.Authenticate()
ee.Initialize(project='ee-realgman69')

# Initialize FastAPI app
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_router.router)
app.include_router(address_router.router)

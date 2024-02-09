from fastapi import APIRouter

from ion_backend.app.api.endpoints.auth import firebase_router

api_router = APIRouter()

api_router.include_router(firebase_router)
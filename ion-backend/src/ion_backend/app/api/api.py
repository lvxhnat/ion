from fastapi import APIRouter

from ion_backend.app.api.endpoints.auth import firebase_router
from ion_backend.app.api.endpoints.portfolio import portfolio_router
from ion_backend.app.api.endpoints.economics import economics_router

api_router = APIRouter()

api_router.include_router(firebase_router)
api_router.include_router(portfolio_router)
api_router.include_router(economics_router)

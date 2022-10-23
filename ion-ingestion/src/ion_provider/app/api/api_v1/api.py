from fastapi import APIRouter

from ion_provider.app.api.api_v1.endpoints import candles

api_router = APIRouter()
api_router.include_router(
    candles.router,
    prefix="/candles",
    tags=["candles"],
)

from fastapi import APIRouter

from data_ingestion.app.api.api_v1.endpoints.autocomplete import (
    router as autocomplete_router,
)
from data_ingestion.app.api.api_v1.endpoints.candles import (
    router as candles_router,
)

api_router = APIRouter()
api_router.include_router(
    autocomplete_router,
    prefix="/autocomplete",
    tags=["autocomplete"],
)

api_router.include_router(
    candles_router,
    prefix="/candles",
    tags=["candles"],
)

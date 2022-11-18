from fastapi import APIRouter

from data_ingestion.app.api.api_v1.endpoints.autocomplete import (
    router as autocomplete_router,
)

api_router = APIRouter()
api_router.include_router(
    autocomplete_router,
    prefix="/autocomplete",
    tags=["autocomplete"],
)

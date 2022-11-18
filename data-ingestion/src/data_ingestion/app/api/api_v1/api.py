from fastapi import APIRouter

from ion_ingestion.app.api.api_v1.endpoints import autocomplete

api_router = APIRouter()
api_router.include_router(
    autocomplete.router,
    prefix="/autocomplete",
    tags=["autocomplete"],
)

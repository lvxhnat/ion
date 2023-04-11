from fastapi import APIRouter

from data_ingestion.app.api.api_v1.endpoints import (
    etf,
    candles,
    postgres,
    autocomplete,
    weather,
)

api_router = APIRouter()
api_router.include_router(candles.router)
api_router.include_router(postgres.router)
api_router.include_router(autocomplete.router)
api_router.include_router(weather.router)
api_router.include_router(etf.router)

from fastapi import APIRouter

from data_ingestion.app.api.api_v2.endpoints.weather import weather
from data_ingestion.app.api.api_v2.endpoints.tickers import (
    etf,
    forex, 
    equity,
)
from data_ingestion.app.api.api_v2.endpoints.database import postgres

api_router = APIRouter()
api_router.include_router(forex.router)
api_router.include_router(equity.router)
api_router.include_router(etf.router)
api_router.include_router(weather.router)
api_router.include_router(postgres.router)
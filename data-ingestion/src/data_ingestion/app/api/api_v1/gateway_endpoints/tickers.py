from fastapi import APIRouter

from data_ingestion.app.configs.base_config import settings as base_settings

router = APIRouter(
    prefix=f"{base_settings.MASK_ENDPOINT_PREFIX}/tickers",
    tags=["tickers"],
)

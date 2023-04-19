from fastapi import APIRouter
from pyetfdb_scraper.etf import ETF

from data_ingestion.app.configs.base_config import settings as base_settings
from data_ingestion.app.api.api_v1.models.metadata.etf.params import (
    ETFQueryParams,
)

router = APIRouter(
    prefix=f"{base_settings.BASE_ENDPOINT_PREFIX}/etf",
    tags=["etf"],
)


@router.post("/info")
async def retrieve_files(params: ETFQueryParams):
    etf = ETF(params.ticker)
    return etf.to_dict()

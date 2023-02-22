from fastapi import APIRouter
from pyetfdb_scraper.etf import ETF

from data_ingestion.app.api.api_v1.models.etf import ETFQueryParams

router = APIRouter(
    prefix="/etf",
    tags=["etf"],
)


@router.post("/info")
async def retrieve_files(
    params: ETFQueryParams
):
    etf = ETF(params.ticker)
    return etf.to_dict()
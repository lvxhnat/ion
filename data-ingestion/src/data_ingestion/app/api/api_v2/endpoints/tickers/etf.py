from typing import List
from fastapi import APIRouter
from pyetfdb_scraper.etf import ETF

from data_ingestion.app.api.api_v2.postgres.schemas.data.tickers.params import (
    InfoETFParams,
)


router = APIRouter(
    tags=["tickers", "etf"],
)


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post(f"/info")
def get_info_etf_data(
    params: InfoETFParams,
):

    """Retrieve the historical forex data given a currency pair.

    SOURCE: ETF Database

    Parameters
    ----------

    Behavior
    ----------

    Returns
    ----------
    """

    etf = ETF(params.ticker)
    return etf.to_dict()

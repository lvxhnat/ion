import pandas as pd
from fastapi import APIRouter

from ion_clients.services.postgres.postgres_service import _get_postgres_engine

from data_ingestion.app.api.api_v2.postgres.schemas.data.tickers.params import (
    ETFInfoParams,
    ETFInfosParams,
)

router = APIRouter(
    tags=["tickers", "etf"],
)


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post(f"/info")
def get_etf_info(
    params: ETFInfoParams,
):
    return


@router.post(f"/infos")
def get_etfs_info(
    params: ETFInfosParams,
):
    pass

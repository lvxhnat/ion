from sqlalchemy.orm import Session
from sqlalchemy import or_, func

from fastapi import APIRouter, Depends

from ion_clients.services.postgres.postgres_service import get_session
from ion_clients.services.postgres.actions import order_search

from data_ingestion.app.api.api_v2.postgres.schemas.infra.postgres.params import (
    AssetSearchParams,
)
from data_ingestion.app.api.api_v2.configs.base_config import (
    configs as base_configs,
)

# Autocomplete can be implemented by postgres, elastic etc, so a generic autocomplete file is created for it

router = APIRouter(
    tags=["autocomplete"],
)


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/query")
def query_asset_search_table(
    params: AssetSearchParams, session: Session = Depends(get_session)
):
    if len(params.query) < 4:
        query = func.lower(
            base_configs.POSTGRES_TABLES[params.table].symbol
        ).like(f"%{params.query}%".lower())
    else:
        query = or_(
            func.lower(base_configs.POSTGRES_TABLES[params.table].symbol).like(
                f"%{params.query}%".lower()
            ),
            func.lower(base_configs.POSTGRES_TABLES[params.table].name).like(
                f"%{params.query}%".lower()
            ),
        )
    return order_search(
        session,
        filters=[query],
        table_schema=base_configs.POSTGRES_TABLES[params.table],
        first=False,
    )

from sqlalchemy.orm import Session
from sqlalchemy import or_, func

from fastapi import APIRouter, Depends

from ion_clients.services.postgres.postgres_service import get_session
from ion_clients.services.postgres.actions import order_search

from data_ingestion.app.api.api_v2.postgres.models.data.tickers import (
    AssetMetaData,
)
from data_ingestion.app.api.api_v2.postgres.schemas.infra.postgres.params import (
    AssetSearchParams,
)

# Autocomplete can be implemented by postgres, elastic etc, so a generic autocomplete file is created for it

router = APIRouter(
    prefix="/autocomplete",
    tags=["autocomplete"],
)

query_tables = {AssetMetaData.__tablename__: AssetMetaData}


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/query")
def query_postgres_table(
    params: AssetSearchParams, session: Session = Depends(get_session)
):
    if len(params.query) < 4:
        query = func.lower(query_tables[params.table].symbol).like(
            f"%{params.query}%"
        )
    else:
        query = or_(
            func.lower(query_tables[params.table].symbol).like(
                f"%{params.query}%"
            ),
            func.lower(query_tables[params.table].name).like(
                f"%{params.query}%"
            ),
        )
    return order_search(
        session,
        filters=[query],
        table_schema=query_tables[params.table],
        first=False,
    )

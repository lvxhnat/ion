from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_clients.services.postgres.actions import order_query, get_session

from data_ingestion.app.api.api_v1.models.database.postgres.tables import (
    tables as postgres_tables,
)
from data_ingestion.app.api.api_v1.models.database.postgres.params import (
    TableQueryParams,
)


router = APIRouter(
    prefix="/postgres",
    tags=["database", "postgres"],
)

@router.get("/health", tags=["health"])
def health_check():
    return {"status": "healthy"}

@router.post("/query")
def query_postgres_table(
    params: TableQueryParams, session: Session = Depends(get_session)
):
    return order_query(
        postgres_tables[params.table],
        session,
        postgres_tables[params.table]._date,
    )

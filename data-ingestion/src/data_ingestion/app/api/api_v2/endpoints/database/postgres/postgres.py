from typing import Literal
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_clients.services.postgres.actions import order_query, get_session
from ion_clients.services.postgres.schemas.infra.portfolio import Portfolio

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

query_tables = {
    Portfolio.__tablename__: Portfolio,
}


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


@router.get("/{tableId}")
def get_postgres_table(
    tableId: Portfolio.__tablename__,
    session: Session = Depends(get_session),
):
    items = session.query(query_tables[tableId]).all()
    return items


@router.delete("/{tableId}")
def delete_postgres_table_entry(
    id: int,
    tableId: Portfolio.__tablename__,
    session: Session = Depends(get_session),
):
    entry = session.query(query_tables[tableId]).get(id)
    session.delete(entry).commit().close()
    return


@router.post("/{tableId}")
def insert_postgres_table_entry(
    tableId: Portfolio.__tablename__,
    session: Session = Depends(get_session),
):
    print("test")
    return

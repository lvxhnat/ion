from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_clients.services.postgres.actions import order_query
from ion_clients.services.postgres.postgres_service import get_session

from data_ingestion.app.api.api_v2.postgres.models.infra.portfolio import (
    Portfolio,
    PortfolioAssets,
)
from data_ingestion.app.api.api_v2.postgres.schemas.infra.postgres.params import (
    PostgresTable,
)
from data_ingestion.app.api.api_v2.postgres.schemas.infra.postgres.params import (
    tables as postgres_tables,
    TableQueryParams,
    PortfolioSearchParams,
)

router = APIRouter(
    tags=["postgres"],
)

query_tables = {
    Portfolio.__tablename__: Portfolio,
    PortfolioAssets.__tablename__: PortfolioAssets,
}


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/query")
def query_postgres_table(
    params: TableQueryParams, session: Session = Depends(get_session)
):
    return order_query(
        session,
        table_schema=postgres_tables[params.table],
        table_column=postgres_tables[params.table]._date,
    )


@router.post("/query/portfolio")
def query_portfolio_table(
    params: PortfolioSearchParams, session: Session = Depends(get_session)
):
    return (
        session.query(PortfolioAssets)
        .filter(PortfolioAssets.portfolio_id == params.id)
        .all()
    )


@router.get("/{table_name}")
def get_postgres_table(
    table_name: str,
    session: Session = Depends(get_session),
):
    items = session.query(query_tables[table_name]).all()
    return items


@router.delete("/{table_name}")
def delete_postgres_table_entry(
    table_name: str,
    id: str,
    session: Session = Depends(get_session),
):
    entry = session.query(query_tables[table_name]).get(id)
    session.delete(entry)
    return


@router.post("/{table_name}")
def insert_postgres_table_entry(
    table_name: str,
    entry: PostgresTable,
    session: Session = Depends(get_session),
):
    session.add(query_tables[table_name](**entry.dict()))
    return


@router.put("/{table_name}")
def update_postgres_table_entry(
    table_name: str,
    id: str,
    replacement_entry: PostgresTable,
    session: Session = Depends(get_session),
):
    session.query(query_tables[table_name]).get(id).update(replacement_entry)

from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_clients.services.postgres.actions import order_query
from ion_clients.services.postgres.postgres_service import get_session

from ion_clients.services.postgres.models.infra import (
    PortfolioAssets,
    Watchlist,
)
from ion_clients.services.postgres.models.data.trading.tickers import (
    AssetMetaData,
)
from data_ingestion.app.api.api_v2.postgres.schemas.infra.postgres.params import (
    PostgresTable,
    tables as postgres_tables,
    TableQueryParams,
    PortfolioSearchParams,
    WatchlistQueryParams,
    TickerQueryParams,
)

from data_ingestion.app.api.api_v2.configs.base_config import (
    configs as base_configs,
)

router = APIRouter(
    tags=["postgres"],
)


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


@router.post("/query/watchlist")
def query_ticker_name_table(
    params: WatchlistQueryParams, session: Session = Depends(get_session)
):
    return (
        session.query(Watchlist)
        .filter(func.lower(Watchlist.symbol) == params.symbol.lower())
        .first()
    )


@router.post("/query/ticker")
def query_ticker_name_table(
    params: TickerQueryParams, session: Session = Depends(get_session)
):
    return (
        session.query(AssetMetaData)
        .filter(func.lower(AssetMetaData.symbol) == params.symbol.lower())
        .first()
    )


@router.get("/{table_name}")
def get_postgres_table(
    table_name: str,
    session: Session = Depends(get_session),
):
    items = session.query(base_configs.POSTGRES_TABLES[table_name]).all()
    return items


@router.delete("/{table_name}")
def delete_postgres_table_entry(
    table_name: str,
    id: str,
    session: Session = Depends(get_session),
):
    print(id, session.query(base_configs.POSTGRES_TABLES[table_name]).get(id))
    entry = session.query(base_configs.POSTGRES_TABLES[table_name]).get(id)
    session.delete(entry)
    return


@router.post("/{table_name}")
def insert_postgres_table_entry(
    table_name: str,
    entry: PostgresTable,
    session: Session = Depends(get_session),
):
    session.add(base_configs.POSTGRES_TABLES[table_name](**entry.dict()))
    return


@router.put("/{table_name}")
def update_postgres_table_entry(
    table_name: str,
    id: str,
    replacement_entry: PostgresTable,
    session: Session = Depends(get_session),
):
    session.query(base_configs.POSTGRES_TABLES[table_name]).get(id).update(
        replacement_entry
    )

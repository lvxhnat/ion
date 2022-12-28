from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_clients.services.postgres.actions import order_query, get_session

from data_ingestion.app.api.api_v1.models.postgres import (
    TableQueryParams,
    tables,
)


router = APIRouter(
    prefix="/db",
    tags=["db"],
)


@router.post("/query")
def get_table_details(
    params: TableQueryParams, session: Session = Depends(get_session)
):
    return order_query(
        tables[params.table], session, tables[params.table]._date
    )

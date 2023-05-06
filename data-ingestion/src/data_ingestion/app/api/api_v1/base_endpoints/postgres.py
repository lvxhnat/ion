from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_clients.services.postgres.actions import order_query
from ion_clients.services.postgres.postgres_service import get_session

from data_ingestion.app.api.api_v1.configs.base_config import (
    settings as base_settings,
)
from data_ingestion.app.api.api_v1.models.database.postgres.tables import (
    tables as postgres_tables,
)
from data_ingestion.app.api.api_v1.models.database.postgres.params import (
    TableQueryParams,
)


router = APIRouter(
    prefix=f"{base_settings.BASE_ENDPOINT_PREFIX}/db",
    tags=["db"],
)


@router.get("/ping")
def ping():
    return {"status": 200}


@router.post("/query")
def get_table_details(
    params: TableQueryParams, session: Session = Depends(get_session)
):
    return order_query(
        session,
        table_schema=postgres_tables[params.table],
        table_column=postgres_tables[params.table]._date,
    )

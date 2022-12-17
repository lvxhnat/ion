from ion_clients.services.postgres.postgres_service import postgres

from data_ingestion.app.api.api_v1.models.postgres import (
    TableQueryParams,
    tables,
)
from fastapi import APIRouter
from sqlalchemy import desc

router = APIRouter(
    prefix="/db",
    tags=["db"],
)


@router.post("/query")
def get_table_details(params: TableQueryParams):
    with postgres.session_scope() as session:
        query = (
            session.query(tables[params.table])
            .order_by(desc(tables[params.table]._date))
            .limit(50)
        )
        return [
            {
                c.name: getattr(row, c.name)
                for c in row.__table__.columns
                if c.name != "uuid"
            }
            for row in query
        ]

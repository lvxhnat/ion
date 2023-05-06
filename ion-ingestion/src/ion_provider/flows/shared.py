from prefect import task
from sqlalchemy import Table

from ion_clients.services.postgres.actions import bulk_upsert, bulk_insert
from ion_clients.services.postgres.postgres_service import (
    table_exists,
    drop_table,
    get_session,
)
from ion_clients.services.postgres.schemas.params import WriteObjectType


@task
def refresh_table(
    table_schema: Table,
    write_objects: WriteObjectType,
    coerce_refresh: bool = False,
):
    with get_session() as session:
        params = {
            "session": session,
            "table_schema": table_schema,
            "write_objects": write_objects,
        }
        if table_exists(table_schema) and not coerce_refresh:
            bulk_upsert(**params)
        elif coerce_refresh:
            drop_table(table_schema)
            bulk_insert(**params)
        else:
            bulk_insert(**params)
        return

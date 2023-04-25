from prefect import task
from ion_clients.services.postgres.actions import (
    bulk_upsert,
    bulk_refresh,
)
from ion_clients.services.postgres.postgres_service import postgres

@task
def write_table(table_name, table_info):
    with postgres.session_scope() as session:
        return bulk_upsert(session, table_name, table_info)


@task
def refresh_table(table_name, table_info):
    with postgres.session_scope() as session:
        return bulk_refresh(session, table_name, table_info)

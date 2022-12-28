from prefect import task
from ion_clients.services.postgres.actions import postgres_bulk_upsert, postgres_bulk_refresh

@task
def write_table(table_name, table_info):
    return postgres_bulk_upsert(table_name, table_info)

@task
def refresh_table(table_name, table_info):
    return postgres_bulk_refresh(table_name, table_info)
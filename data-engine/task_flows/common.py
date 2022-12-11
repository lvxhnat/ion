from prefect import task
from ion_clients.services.postgres.actions import postgres_bulk_upsert

@task
def write_table(table_name, table_info):
    return postgres_bulk_upsert(table_name, table_info)


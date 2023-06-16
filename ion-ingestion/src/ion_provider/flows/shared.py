import pandas as pd
from prefect import task
from sqlalchemy import Table
from typing import List, Union

from ion_clients.services.postgres.actions import bulk_upsert, bulk_insert
from ion_clients.services.postgres.postgres_service import (
    table_exists,
    SQLDatabase,
    _get_postgres_engine
)
from ion_clients.services.postgres.actions import clear_table

WriteObjectType = Union[List[dict], List[Table], pd.DataFrame] # List[sqlalchemy.Table]

@task
def sql_refresh_table(
    df: pd.DataFrame,
    table_schema: Table,
):
    if not isinstance(df, pd.DataFrame):
        raise TypeError(f"Df needs to be of type pd.DataFrame, received {str(type(df))} instead.")
    with _get_postgres_engine() as conn:
        df.to_sql(table_schema.__tablename__, conn)
        
@task
def refresh_table(
    table_schema: Table,
    write_objects: WriteObjectType,
    coerce_refresh: bool = False,
):
    postgres = SQLDatabase()
    with postgres.session_scope() as session:
        params = {
            "session": session,
            "table_schema": table_schema,
            "write_objects": write_objects,
        }
        if table_exists(table_schema) and not coerce_refresh:
            bulk_upsert(**params)
        elif coerce_refresh:
            clear_table(session, table_schema)
            bulk_insert(**params)
        else:
            bulk_insert(**params)
        return

import uuid
import warnings
import pandas as pd
from typing import List, Union

import psycopg2

from sqlalchemy import inspect, desc, Table
from sqlalchemy.orm import Session
from sqlalchemy.exc import UnboundExecutionError
from sqlalchemy.orm.attributes import InstrumentedAttribute

from ion_clients.services.postgres.postgres_service import (
    postgres,
    postgres_engine,
)


def get_session():
    with postgres.session_scope() as session:
        yield session


def order_search(
    TableSchema: Table,
    session: Session,
    filters: List,
    first: bool = True,
) -> dict:
    if first:
        return session.query(TableSchema).filter(*filters).first()
    else: 
        return session.query(TableSchema).filter(*filters).all()


def order_exists(
    TableSchema: Table,
    filters: List,
) -> dict:
    with postgres.session_scope() as session:
        return session.query(TableSchema).filter(*filters).exists()


def order_query(
    TableSchema: Table,
    session: Session,
    col: InstrumentedAttribute,
    descending: bool = True,
    limit: int = 50
) -> List[dict]:

    query = (
        session.query(TableSchema)
        .order_by(desc(col) if descending else col)
        .limit(limit)
    )

    return [
        {
            c.name: getattr(row, c.name)
            for c in row.__table__.columns
            if c.name != "uuid"
        }
        for row in query
    ]


def table_exists(TableSchema) -> bool:
    return inspect(postgres_engine).has_table(TableSchema.__tablename__)


def initialise_table(TableSchema) -> bool:
    # Create table if it does not exist
    try:
        if not table_exists(TableSchema):
            TableSchema.__table__.create(postgres_engine)
        return True
    except psycopg2.OperationalError:
        raise


def drop_table(TableSchema):
    if table_exists(TableSchema=TableSchema):
        try:
            TableSchema.__table__.drop()
        except UnboundExecutionError:
            TableSchema.__table__.drop(postgres_engine)
    else:
        warnings.warn(f"No {TableSchema.__tablename__} to drop.")


def bulk_upsert(
    session,
    TableSchema: Table,
    WriteObject: Union[List[dict], pd.DataFrame],
    upsert_key: str = None,
):
    """Create table and update table if entry does not exist

    Args:
        TableSchema (_type_): A schema inherited from declarative_base()
        WriteObject (_type_): The object to be written into the table with schema as specified by TableSchema. Rollback otherwise.

    Example Usage:
    >>> from ion_clients.services.postgres.schemas.area_latlon import AreaLatLon
    >>> import pandas as pd
    >>> df = pd.read_csv(
        "/Users/lohyikuang/Downloads/personal_projects/ion/research-notebooks/areaLatLon.csv"
    )
    >>> postgres_bulk_upsert(AreaLatLon, df, primary_key=None)

    """

    table_columns: List[str] = [
        *map(lambda s: s.name, TableSchema.__table__.columns)
    ]

    if upsert_key and upsert_key not in table_columns:
        raise ValueError(
            f"{upsert_key} not found in {TableSchema.__tablename__}. Available columns are {TableSchema.__tablename__}"
        )

    if not isinstance(WriteObject, list) or not isinstance(
        WriteObject[0], dict
    ):
        raise TypeError(
            "You entered WriteObject of type {str(type(WriteObject))} which is not supported. Please Enter WriteObject of type List[dict] or pd.DataFrame!"
        )

    if not table_exists(TableSchema):
        # Create table if it does not exist
        TableSchema.__table__.create(postgres_engine)
        uuid_col_exists: bool = "uuid" in table_columns

        objects: List[TableSchema] = []

        if isinstance(WriteObject, pd.DataFrame):
            WriteObject = WriteObject.iterrows()

        for object in WriteObject:
            # If id column exists, and uuid is not in table schema, then we pass
            if uuid_col_exists and object["uuid"] is None:
                del object["uuid"]
                objects.append(TableSchema(uuid=str(uuid.uuid4()), **object))
            else:
                if not upsert_key:
                    warnings.warn(
                        "No unique id column provided, or uuid detected in schema. Defaulting to writing without one."
                    )
                objects.append(TableSchema(**object))

    else:

        if upsert_key == "uuid":
            warnings.warn(
                "Upsert key provided is uuid, which is unlikely to be existing in the current entries. Function will still compare otherwise, but it is recommended an alternative key be provided."
            )

        col_attr = getattr(TableSchema, upsert_key)
        entries_existing = (
            session.query(col_attr)
            .filter(col_attr.in_([*map(lambda s: s[upsert_key], WriteObject)]))
            .all()
        )

        upsert_entries = []
        for object in WriteObject:
            # Check if the entry is already in the database. If not, create tableschema
            if not object[upsert_key] in entries_existing:
                upsert_entries.append(TableSchema(**object))

    session.bulk_save_objects(objects)

    return


def bulk_refresh(
    session, TableSchema: Table, WriteObject: Union[List[dict], pd.DataFrame]
):
    drop_table(TableSchema)
    bulk_upsert(session, TableSchema, WriteObject)

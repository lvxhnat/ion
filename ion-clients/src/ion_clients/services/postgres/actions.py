import uuid
import pandas as pd
from typing import List, Union

import psycopg2

from sqlalchemy import inspect, desc, Table, exc as sqlalchemyExcs, MetaData
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import InstrumentedAttribute

from ion_clients.services.postgres.postgres_service import (
    postgres,
    postgres_engine,
)
from ion_clients.services.logging import get_logger

logger = get_logger()


def get_session():
    with postgres.session_scope() as session:
        yield session


def table(table_name: str) -> Table:
    return Table(
        table_name,
        MetaData(),
        autoload=True,
        autoload_with=postgres_engine,
    )


def serialize(query) -> List[dict]:
    if isinstance(query, list):
        return [
            {
                c.name: getattr(row, c.name)
                for c in row.__table__.columns
                if c.name != "uuid"
            }
            for row in query
        ]
    else:
        return {
            c.name: getattr(query, c.name)
            for c in query.__table__.columns
            if c.name != "uuid"
        }


def order_search(
    session: Session,
    filters: List,
    TableSchema: Table = None,
    first: bool = True,
) -> dict:

    if first:
        return serialize(session.query(TableSchema).filter(*filters).first())
    else:
        return serialize(session.query(TableSchema).filter(*filters).all())


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
    limit: int = 50,
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


def initialise_table(TableSchema, engine=postgres_engine) -> bool:
    # Create table if it does not exist
    try:
        if not table_exists(TableSchema):
            TableSchema.__table__.create(engine)
        return True
    except psycopg2.OperationalError as psye:
        logger.error(
            "Postgres server is not running or has an issue spinning up. psycopg2 raised OperationalError."
        )
        return False
    except sqlalchemyExcs.OperationalError as psye:
        logger.error(
            "Postgres server is not running or has an issue spinning up. psycopg2 raised OperationalError."
        )
        return False


def drop_table(TableSchema):
    if table_exists(TableSchema=TableSchema):
        try:
            TableSchema.__table__.drop()
        except sqlalchemyExcs.UnboundExecutionError:
            TableSchema.__table__.drop(postgres_engine)
    else:
        logger.error(f"No {TableSchema.__tablename__} to drop.")


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

        objects: List[TableSchema] = []

        if isinstance(WriteObject, pd.DataFrame):
            WriteObject = WriteObject.iterrows()

        for object in WriteObject:
            # If id column exists, and uuid is not in table schema, then we pass
            if "uuid" in object:
                del object["uuid"]
            else:
                object["uuid"] = str(uuid.uuid4())
            objects.append(TableSchema(**object))

    else:

        if upsert_key == "uuid":
            logger.info(
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


def paginate_table_by_id(
    session: Session, table_name: str, page: int = 1, pagesize: int = 10
) -> List[dict]:
    table: Table = Table(
        table_name, MetaData(), autoload=True, autoload_with=postgres_engine
    )

    s = []
    for entry in (
        session.query(table)
        .order_by(table.columns[0])
        .offset(pagesize * (page - 1))
        .limit(pagesize)
        .all()
    ):
        s.append({c.name: getattr(entry, c.name) for c in table.columns})
    return s

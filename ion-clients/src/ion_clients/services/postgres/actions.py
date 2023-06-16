import pandas as pd
from typing import List, Union

from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import InstrumentedAttribute
from sqlalchemy import desc, Table

from ion_clients.services.logging import get_logger
from ion_clients.services.postgres.postgres_service import (
    create_table,
)

logger = get_logger(__name__)
WriteObjectType = Union[
    List[dict], List[Table], pd.DataFrame
]  # List[sqlalchemy.Table]


def _serialize(query) -> List[dict]:
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


def clear_table(session: Session, /, table_schema: Table):
    return session.query(table_schema).delete()


def entry_exists(
    session: Session,
    /,
    table_schema: Table,
    filters: list,
):
    """Check if an entry exists in a table

    >>> entry_exists(USBillRates, {"name": "John Smith"})
    """
    return bool(session.query(table_schema).filter(*filters).first())


def order_search(
    session: Session,
    /,
    filters: list,
    table_schema: Table,
    limit: int = 10,
    first: bool = True,
) -> dict:
    if first:
        return _serialize(session.query(table_schema).filter(*filters).first())
    else:
        return _serialize(
            session.query(table_schema).filter(*filters).limit(limit).all()
        )


def order_query(
    session: Session,
    /,
    table_schema: Table,
    table_column: InstrumentedAttribute,
    descending: bool = True,
    limit: int = 50,
) -> List[dict]:

    return [
        {
            c.name: getattr(row, c.name)
            for c in row.__table__.columns
            if c.name != "uuid"
        }
        for row in session.query(table_schema)
        .order_by(desc(table_column) if descending else table_column)
        .limit(limit)
    ]


def bulk_upsert(
    session: Session, table_schema: Table, write_objects: WriteObjectType
) -> None:
    """Bulk upsert (update if present, insert if absent) a given sequence of write objects into a database"""
    create_table(table_schema)

    if isinstance(write_objects, pd.DataFrame):
        for write_object in write_objects.iterrows():
            session.merge(table_schema(**write_object))
        return

    for write_object in write_objects:
        if isinstance(write_object, table_schema):
            session.merge(write_object)
        else:
            session.merge(table_schema(**write_object))
    return


def bulk_insert(
    session: Session, table_schema: Table, write_objects: WriteObjectType
) -> None:

    """Bulk insert a given sequence of write objects into a database"""

    create_table(table_schema)

    entries = []

    if isinstance(write_objects, pd.DataFrame):
        for write_object in write_objects.iterrows():
            entries.append(table_schema(**write_object))
        session.bulk_save_objects(entries)
        return

    for write_object in write_objects:
        if isinstance(write_object, table_schema):
            entries.append(write_object)
        else:
            entries.append(table_schema(**write_object))

    session.bulk_save_objects(entries)
    return

import psycopg2
import pandas as pd
from pydantic import BaseModel
from typing import List, Union

from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import InstrumentedAttribute
from sqlalchemy import desc, exc as MetaData, Table

from ion_clients.services.logging import get_logger
from ion_clients.services.postgres.postgres_service import (
    drop_table,
    create_table,
)
from ion_clients.services.postgres.schemas.params import BulkEditParams

logger = get_logger()


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
    table_schema: Table = None,
    first: bool = True,
) -> dict:
    if first:
        return _serialize(session.query(table_schema).filter(*filters).first())
    else:
        return _serialize(session.query(table_schema).filter(*filters).all())


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


def bulk_upsert(params: BulkEditParams) -> None:
    """Bulk upsert (update if present, insert if absent) a given sequence of write objects into a database"""
    create_table(params.table_schema)

    if isinstance(params.write_objects, pd.DataFrame):
        for write_object in params.write_objects.iterrows():
            params.session.merge(params.table_schema(**write_object))
        return

    for write_object in params.write_objects:
        if isinstance(write_object, params.table_schema):
            params.session.merge(write_object)
        else:
            params.session.merge(params.table_schema(**write_object))
    return


def bulk_insert(params: BulkEditParams) -> None:

    """Bulk insert a given sequence of write objects into a database"""

    create_table(params.table_schema)

    entries = []

    if isinstance(params.write_objects, pd.DataFrame):
        for write_object in params.write_objects.iterrows():
            entries.append(params.table_schema(**write_object))
        params.session.bulk_save_objects(entries)
        return

    for write_object in params.write_objects:
        if isinstance(write_object, params.table_schema):
            entries.append(write_object)
        else:
            entries.append(params.table_schema(**write_object))

    params.session.bulk_save_objects(entries)
    return

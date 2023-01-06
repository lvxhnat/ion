import uuid
import pandas as pd
from typing import List, Union

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
) -> dict:
    return session.query(TableSchema).filter(*filters).first()


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
) -> List[dict]:

    query = (
        session.query(TableSchema)
        .order_by(desc(col) if descending else col)
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


def table_exists(TableSchema) -> bool:
    return inspect(postgres_engine).has_table(TableSchema.__tablename__)


def postgres_bulk_upsert(
    TableSchema: Table,
    WriteObject: Union[List[dict], pd.DataFrame],
    primary_key: str = "_date",
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
    if isinstance(WriteObject, pd.DataFrame):
        WriteObject = WriteObject.to_dict("records")

    if not isinstance(WriteObject, list) or not isinstance(
        WriteObject[0], dict
    ):
        raise TypeError(
            "You entered WriteObject of type {str(type(WriteObject))} which is not supported. Please Enter WriteObject of type List[dict] or pd.DataFrame!"
        )

    uuid_exists: bool = "uuid" in WriteObject[0].keys()

    with postgres.session_scope() as session:
        # Create table if it does not exist
        if not table_exists(TableSchema):
            TableSchema.__table__.create(postgres_engine)
            # Bulk insert if the table does not exist

            objects: List[TableSchema] = []
            for object in WriteObject:
                if uuid_exists:
                    del object["uuid"]
                objects.append(TableSchema(uuid=str(uuid.uuid4()), **object))

            session.bulk_save_objects(
                [
                    TableSchema(uuid=str(uuid.uuid4()), **object)
                    for object in WriteObject
                ]
            )
        else:
            # Check if entry exists in table
            for object in WriteObject:
                if primary_key and (
                    session.query(TableSchema.uuid)
                    .filter_by(_date=object[primary_key])
                    .first()
                    is not None
                ):
                    pass
                else:
                    if uuid_exists:
                        del object["uuid"]
                    session.add(TableSchema(uuid=str(uuid.uuid4()), **object))
        return


def postgres_bulk_refresh(
    TableSchema: Table, WriteObject: Union[List[dict], pd.DataFrame]
):
    try:
        if table_exists(TableSchema):
            TableSchema.__table__.drop()
    except UnboundExecutionError:
        TableSchema.__table__.drop(postgres_engine)
    postgres_bulk_upsert(TableSchema, WriteObject)


if __name__ == "__main__":
    from ion_clients.services.postgres.schemas.area_latlon import AreaLatLon

    print(type(AreaLatLon.uuid), AreaLatLon.uuid)

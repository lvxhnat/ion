import uuid
from sqlalchemy import inspect
from ion_clients.services.postgres.postgres_service import (
    postgres,
    postgres_engine,
)


def table_exists(TableSchema) -> bool:
    return inspect(postgres_engine).has_table(TableSchema.__tablename__)


def postgres_bulk_upsert(TableSchema, WriteObject):
    """Create table and update table if entry does not exist

    Args:
        TableSchema (_type_): A schema inherited from declarative_base()
        WriteObject (_type_): The object to be written into the table with schema as specified by TableSchema. Rollback otherwise.
    """
    with postgres.session_scope() as session:
        # Create table if it does not exist
        if not table_exists(TableSchema):
            TableSchema.__table__.create(postgres_engine)
            # Bulk insert if the table does not exist
            session.bulk_save_objects(
                [
                    TableSchema(uuid=str(uuid.uuid4()), **object)
                    for object in WriteObject
                ]
            )
        else:
            # Iterate
            for object in WriteObject:
                if (
                    session.query(TableSchema.uuid)
                    .filter_by(_date=object["_date"])
                    .first()
                    is not None
                ):
                    return
                session.add(TableSchema(uuid=str(uuid.uuid4()), **object))

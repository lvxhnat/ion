import uuid
from prefect import task, flow
from sqlalchemy import inspect
from ion_clients.clients.usdept.treasury import treasury_info
from ion_clients.clients.usdept.types.treasury import (
    TreasuryInfoDTO,
    TreasuryYears,
    TreasuryTypes,
)
from ion_clients.services.postgres.postgres_service import (
    postgres,
    postgres_engine,
)
from ion_clients.services.postgres.schemas.treasury import USTreasuryYield


@task
def ingest_treasury(year: TreasuryYears, treasury_type: TreasuryTypes):
    return treasury_info(year=year, treasury_type=treasury_type)


@task
def write_treasury(treasury_info: TreasuryInfoDTO):
    with postgres.session_scope() as session:
        # Create table if it does not exist
        if not inspect(postgres_engine).has_table(
            USTreasuryYield.__tablename__
        ):
            USTreasuryYield.__table__.create(postgres_engine)
            # Bulk insert if the table does not exist
            session.bulk_save_objects([USTreasuryYield(uuid=str(uuid.uuid4()), **object)for object in treasury_info])
        else:
            # Iterate
            for object in treasury_info:
                if (
                    session.query(USTreasuryYield.uuid)
                    .filter_by(_date=object["_date"])
                    .first()
                    is not None
                ):
                    return
                session.add(USTreasuryYield(uuid=str(uuid.uuid4()), **object))


@flow
def treasury_ingestion_flow():
    treasury_item = ingest_treasury.submit(2022, "YIELD_CURVE").result()
    write_treasury.submit(treasury_item).result()


treasury_ingestion_flow()

        
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
        if inspect(postgres_engine).has_table(USTreasuryYield.__tablename__):
            USTreasuryYield.__table__.drop(postgres_engine)
        USTreasuryYield.__table__.create(postgres_engine)
        session.bulk_save_objects(
            [
                USTreasuryYield(uuid=str(uuid.uuid4()), **object)
                for object in treasury_info
            ]
        )


@flow
def treasury_ingestion_flow():
    result = ingest_treasury(2022, "YIELD_CURVE")
    return write_treasury(result)


treasury_ingestion_flow()

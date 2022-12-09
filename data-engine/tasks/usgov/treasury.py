from prefect import task, flow
from ion_clients.clients.usdept.treasury import treasury_info
from ion_clients.clients.usdept.types.treasury import (
    TreasuryInfoDTO,
    TreasuryYears,
    TreasuryTypes,
)
from ion_clients.services.postgres.postgres_service import postgres
from ion_clients.services.postgres.schemas.treasury import USTreasuryYield


@task
def ingest_treasury(year: TreasuryYears, treasury_type: TreasuryTypes):
    return treasury_info(year=year, treasury_type=treasury_type)


@task
def write_treasury(treasury_info: TreasuryInfoDTO):
    with postgres.session_scope() as session:
        session.bulk_save_objects(
            [USTreasuryYield(**object) for object in treasury_info]
        )


@flow
def treasury_ingestion_flow():
    result = ingest_treasury(2022, "YIELD_CURVE")
    return write_treasury(result)


treasury_ingestion_flow()

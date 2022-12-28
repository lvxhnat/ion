from typing import List
from datetime import datetime

from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from flows.shared import write_table

from ion_clients.clients.usdept.treasury import treasury_info
from ion_clients.clients.usdept.types.treasury import (
    TreasuryYears,
    TreasuryTypes,
)
from ion_clients.services.postgres.actions import (
    table_exists,
)
from ion_clients.services.postgres.schemas.treasury import (
    USTreasuryYield,
    USBillRates,
    USLongTermRates,
    USRealYieldCurve,
    USRealLongTerm,
)


@task
def ingest_treasury(year: TreasuryYears, treasury_type: TreasuryTypes):
    return treasury_info(year=year, treasury_type=treasury_type)


@flow(
    task_runner=ConcurrentTaskRunner(),
    name="Treasury Scraper Flow",
    description="Scheduled prefect pipeline for extracting treasury information.",
)
def treasury_ingestion_flow(years: List[int], types: List[str]):
    table_names = [
        USTreasuryYield,
        USBillRates,
        USLongTermRates,
        USRealYieldCurve,
        USRealLongTerm,
    ]

    for treasury_type, table_name in zip(types, table_names):
        if not table_exists(table_name):
            for year in years:
                treasury_item = ingest_treasury.submit(
                    year, treasury_type
                ).result()
                write_table.submit(table_name, treasury_item).result()
        else:
            year = datetime.now().year
            treasury_item = ingest_treasury.submit(
                year, treasury_type
            ).result()
            write_table.submit(table_name, treasury_item).result()

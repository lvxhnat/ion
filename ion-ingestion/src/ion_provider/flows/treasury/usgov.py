from typing import List
from datetime import datetime

from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from ion_provider.flows.shared import refresh_table

from ion_clients.services.postgres.postgres_service import table_exists
from ion_clients.clients.usdept.treasury import treasury_info
from ion_clients.clients.usdept.types.treasury import (
    TreasuryYears,
    TreasuryTypes,
)
from ion_provider.models.government.treasury import (
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
    table_schemas = [
        USTreasuryYield,
        USBillRates,
        USLongTermRates,
        USRealYieldCurve,
        USRealLongTerm,
    ]

    for treasury_type, table_schema in zip(types, table_schemas):
        if table_exists(table_schema):
            years = [2023]
        for year in years:
            treasury_item = ingest_treasury.submit(year, treasury_type).result()
            refresh_table.submit(table_schema, treasury_item, True).result()


if __name__ == "__main__":
    treasury_ingestion_flow(
        [2018, 2019, 2020, 2021, 2022, 2023],
        [
            "YIELD_CURVE",
            "BILL_RATES",
            "LONG_TERM_RATE",
            "REAL_YIELD_CURVE",
            "REAL_LONG_TERM",
        ],
    )

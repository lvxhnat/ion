from typing import List
from datetime import datetime

from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from data_engine.flows.shared import refresh_table

from ion_clients.clients.usdept.treasury import treasury_info
from ion_clients.clients.usdept.types.treasury import (
    TreasuryYears,
    TreasuryTypes,
)
from ion_clients.services.postgres.schemas.data.treasury import (
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
        for year in years:
            treasury_item = ingest_treasury.submit(
                year, treasury_type
            ).result()
            refresh_table.submit(table_name, treasury_item).result()


if __name__ == "__main__":
    treasury_ingestion_flow(
        [2017, 2018, 2019, 2020, 2021, 2022],
        [
            "YIELD_CURVE",
            "BILL_RATES",
            "LONG_TERM_RATE",
            "REAL_YIELD_CURVE",
            "REAL_LONG_TERM",
        ],
    )

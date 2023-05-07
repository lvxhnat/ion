"""
Retrieve USDA ESR Data. This section has been placed in prefect's pipeline due to the uncertainty in the connections made with the USDA database servers.
From time to time, the database connection fails, which makes retrieval of data very unreliable.
"""
from datetime import datetime
from typing import Dict, List

from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from ion_provider.flows.shared import refresh_table

from usda_api.scrapers.esr import (
    get_esr_allcountries_export,
    get_esr_country_export,
    get_esr_commodities,
    get_esr_countries,
    get_esr_regions,
    get_esr_unitsofmeasure,
)
from usda_api.scrapers.esr.schemas.response import (
    ESRAllCountriesExportCleanedType,
    ESRCountryExportCleanedType,
    ESRCommoditiesCleanedType,
    ESRCountriesCleanedType,
    ESRRegionsCleanedType,
    ESRUnitsOfMeasureCleanedType,
)


@task(
    retries=5,
    retry_delay_seconds=300,  ## USDA database might be buggy sometimes and require retrying after a short timeout
)
def ingest_esr_metadata(api_key: str):
    get_esr_regions(api_key)


@flow(
    task_runner=ConcurrentTaskRunner(),
    name="Ticker Scraper Flow",
    description="Scheduled prefect pipeline for extracting all asset information.",
)
def asset_ingestion_flow():
    pass


if __name__ == "__main__":
    pass

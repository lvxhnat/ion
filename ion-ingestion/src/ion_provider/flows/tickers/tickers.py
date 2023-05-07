from datetime import datetime
from typing import Dict, List

from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from ion_provider.flows.shared import refresh_table

from ion_provider.models.tickers.tickers import (
    AssetMetaData,
)
from ion_clients.clients.alphavantage.alphavantage import (
    get_alphavantage_ticker_listings,
)


@task
def ingest_asset_metadata():
    """Use AlphaVantage for Ticker Metadata for base ticker data"""
    return get_alphavantage_ticker_listings()


@flow(
    task_runner=ConcurrentTaskRunner(),
    name="Ticker Scraper Flow",
    description="Scheduled prefect pipeline for extracting all asset information.",
)
def asset_ingestion_flow():
    asset_results: List[Dict[str, str]] = (
        ingest_asset_metadata.submit()
        .result()
        .assign(asset_class="stock")
        .assign(last_updated=datetime.today())
        .to_dict("records")
    )
    refresh_table.submit(AssetMetaData, asset_results, True).result()


if __name__ == "__main__":
    asset_ingestion_flow()
    pass
from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from data_engine.flows.shared import refresh_table

from ion_clients.services.postgres.schemas.data.tickers import AssetMetaData


@task
def ingest_ticker_metadata():
    ...

@task
def ingest_etf_metadata():
    ...
    
@task
def ingest_option_metadata():
    ...

@flow(
    task_runner=ConcurrentTaskRunner(),
    name="Ticker Scraper Flow",
    description="Scheduled prefect pipeline for extracting all asset information.",
)
def ticker_ingestion_flow():
    ...
    refresh_table.submit(AssetMetaData, None).result()


if __name__ == "__main__":
    ...

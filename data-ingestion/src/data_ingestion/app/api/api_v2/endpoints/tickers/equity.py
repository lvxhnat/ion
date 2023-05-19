from typing import List
from fastapi import APIRouter
from datetime import datetime, timedelta

from data_ingestion.app.api.api_v2.postgres.schemas.data.tickers.params import (
    HistoricalEquityParams,
)
from data_ingestion.app.api.api_v2.postgres.schemas.data.tickers.dto import (
    HistoricalEquityDTO,
)
from ion_clients.clients.finhub.instruments import get_finnhub_historical_data

router = APIRouter(
    tags=["tickers", "equity"],
)


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/historical")
def get_historical_equity_data(
    params: HistoricalEquityParams,
) -> HistoricalEquityDTO:

    """Retrieve the historical equity data given a ticker symbol or list of ticker symbols.
    This endpoint currently doesnt support to_date parameter, or period calls like the forex endpoint.
    There is support for ETF and Stock Symbols at the moment.

    SOURCE: Finnhub API

    Parameters
    ----------
    HistoricalForexParams \n
    symbols [str] : Ticker symbol. \n
    from_date [Optional[str]] : The date to get the data from, till today's date.\n

    Behavior
    ----------

    Returns
    ----------
    A list of JSON Objects following the HistoricalEquityDTO schema.
    """
    if not params.from_date:
        from_date = (datetime.today() - timedelta(days=365)).strftime(
            "%Y-%m-%d"
        )
    else:
        from_date = params.from_date

    return {
        "data": get_finnhub_historical_data(
            ticker=params.ticker, from_date=from_date
        ),
        "source": "Finnhub",
    }

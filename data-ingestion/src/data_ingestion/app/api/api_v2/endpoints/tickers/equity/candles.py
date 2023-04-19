from datetime import datetime, timedelta

from data_ingestion.app.api.api_v2.endpoints.tickers.router import (
    router as ticker_router,
)
from data_ingestion.app.api.api_v2.models.tickers.params import (
    HistoricalEquityParams,
)
from ion_clients.clients.finhub.instruments import get_finnhub_historical_data

root_url: str = "equity"


@ticker_router.post(f"{root_url}/historical")
def get_historical_equity_data(params: HistoricalEquityParams):

    """Retrieve the historical equity data given a ticker symbol or list of ticker symbols.
    This endpoint currently doesnt support to_date parameter, or period calls like the forex endpoint.

    SOURCE: Finnhub API

    Parameters
    ----------
    params : HistoricalForexParams
        symbols [str] :

    Behavior
    ----------

    Returns
    ----------
    A List of JSON objects with the following fields:
    - bid_open: Optional[float] bid_high: Optional[float] bid_low: Optional[float] bid_close: Optional[float]
    - ask_open: Optional[float] ask_high: Optional[float] ask_low: Optional[float] ask_close: Optional[float]
    """
    if not params.from_date:
        from_date = (datetime.today() - timedelta(days=365)).strftime(
            "%Y-%m-%d"
        )
    else:
        from_date = params.from_date
    return get_finnhub_historical_data(
        tickers=params.tickers, from_date=from_date
    )

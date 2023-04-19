from typing import List
from fastapi import HTTPException

from ion_clients.clients.oanda.instruments import get_oanda_historical_data
from ion_clients.clients.oanda.configs.responses import (
    OandaBaseDataResponse,
    FormattedOandaCandles,
)

from data_ingestion.app.api.api_v2.models.tickers.params import (
    HistoricalForexParams,
)
from data_ingestion.app.api.api_v2.models.tickers.dto import (
    HistoricalForexDTO,
)
from data_ingestion.app.api.api_v2.endpoints.tickers.router import (
    router as ticker_router,
)

root_url: str = "/forex"

@ticker_router.post(f"{root_url}/historical")
def get_historical_forex_data(
    params: HistoricalForexParams,
) -> List[HistoricalForexDTO]:

    """Retrieve the historical forex data given a currency pair.
    There are 3 different ways that we can call forex data here. Either by period, from_date + to_date, count. See the hierarchy for calls in behavior.

    SOURCE: Oanda API

    Parameters
    ----------
    params : HistoricalForexParams
        symbols [str] : "AUD_CAD", "AUD_CHF", "AUD_HKD", "AUD_JPY", "AUD_NZD", "AUD_SGD", "AUD_USD", "CAD_CHF", "CAD_HKD", "CAD_JPY", "CAD_SGD",
                        "CHF_HKD", "CHF_JPY", "CHF_ZAR", "EUR_AUD", "EUR_CAD", "EUR_NZD", "EUR_PLN", "EUR_SEK", "EUR_CHF", "EUR_CZK", "EUR_DKK",
                        "EUR_GBP", "EUR_HKD", "EUR_HUF", "EUR_JPY", "EUR_NOK",  "EUR_SGD", "EUR_TRY", "EUR_USD", "EUR_ZAR", "GBP_AUD", "GBP_CAD",
                        "GBP_CHF", "GBP_HKD", "GBP_JPY", "GBP_NZD", "GBP_PLN", "GBP_SGD", "GBP_USD", "GBP_ZAR", "HKD_JPY", "NZD_CAD", "NZD_CHF",
                        "NZD_HKD", "NZD_JPY", "NZD_SGD", "NZD_USD", "SGD_CHF", "SGD_JPY", "TRY_JPY", "USD_CAD", "USD_CHF", "USD_CNH", "USD_CZK",
                        "USD_DKK", "USD_HKD", "USD_HUF", "USD_JPY", "USD_MXN", "USD_NOK", "USD_PLN", "USD_SEK", "USD_SGD", "USD_THB", "USD_TRY",
                        "USD_ZAR", "ZAR_JPY",
        count [int] : Default value 5000 | which is calculated as 5000 data points from the current start date, with a granularity based on the one specified.
        to_date [str] : Default value None | Date string with format "%Y-%m-%d"
        from_date [str] : Default value None | Date string with format "%Y-%m-%d"
        period [str] : Default value None | "5Y", "1Y", "6M", "3M", "1M", "1M_S", "1W", "1D"
        granularities [int] : Default value S5 | "S5", "S10", "S15", "S30", "M1", "M2", "M4", "M5", "M10", "M15", "M30", "H1", "H2", "H3", "H4", "H6", "H8", "H12", "D", "W", "M",

    Behavior
    ----------
    ** count takes precendence over all else. If specified, from_date, to_date, period is ignored regardless if its specified or not.
    ** period takes precendence next. If specified from_date, to_date is ignored.

    Returns
    ----------
    A List of JSON objects with the following fields:
    - bid_open: Optional[float] bid_high: Optional[float] bid_low: Optional[float] bid_close: Optional[float]
    - ask_open: Optional[float] ask_high: Optional[float] ask_low: Optional[float] ask_close: Optional[float]
    """

    data: OandaBaseDataResponse = get_oanda_historical_data(
        symbol=params.symbol,
        to_date=params.to_date,
        from_date=params.from_date,
        count=params.count,
        period=params.period,
        granularity=params.granularity,
    )

    if data.response_code != 200:
        return HTTPException(
            status_code=data.response_code,
            detail=data.error_message,
        )
    else:
        if not data.data:
            return HTTPException(
                status_code=404,
                detail=f"Unknown exception occured. Response code returned is 200 but raised error code: {data.error_message}",
            )
        forex_data: List[FormattedOandaCandles] = data.data

        return [
            *map(
                lambda forex_entry: {
                    "date": forex_entry.date,
                    "vol": forex_entry.vol,
                    "open": forex_entry.mid_open,
                    "close": forex_entry.mid_close,
                    "high": forex_entry.mid_high,
                    "low": forex_entry.mid_low,
                },
                forex_data,
            )
        ]

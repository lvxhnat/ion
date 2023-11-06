import time
import requests
import pandas as pd
from typing import List
from datetime import datetime, timedelta

from finflow_algos.utils.date import date_to_unixtime
from finflow_ingestion.app.api.endpoints.instruments.equity.finhub.models import AssetHistoricalData

def get_finnhub_historical_data(
    ticker: str,
    api_key: str,
    from_date: str = "2022-02-20",
    resolution: int = "D",                              
    _retries: int = 0,
) -> List[AssetHistoricalData]:
    """
    Parameters
    =============
    ticker -> [str]         : ticker name string
    from_date -> [str]      : %Y-%m-%d
    resolution -> [str]     : Supported resolution includes 1, 5, 15, 30, 60, D, W, M .Some timeframes might not be available depending on the exchange.
    data_format -> [str]    : the default data format to return, either json or csv

    Rate Limits
    =============
    60 API calls/minute

    Example Usage
    =============
    >>> trading_client.get_historical_data( ticker="AAPL", from_date="2022-01-01", data_format = "json")
    >>> [{"close": 23.2, "high": 24.4, "low": 21.3, "open": 23.4, "date": 1642321312, "volume": 23013}, {...}, ...]

    >>> trading_client.get_historical_data( ticker="AAPL", from_date="2022-01-01", data_format = "csv")
    >>>      close      high     low     open                 date     volume symbol
        0   177.57  179.2300  177.26  178.085  2021-12-31 00:00:00   64062261   AAPL
        1   182.01  182.8800  177.71  177.830  2022-01-03 00:00:00  104701220   AAPL
        2   179.70  182.9400  179.12  182.630  2022-01-04 00:00:00   99310438   AAPL
        3   174.92  180.1700  174.64  179.610  2022-01-05 00:00:00   94537602   AAPL
    """

    to_date = datetime.strftime(datetime.now() + timedelta(days=1), "%Y-%m-%d")
    fromdate, todate = date_to_unixtime(
        from_date, "%Y-%m-%d"
    ), date_to_unixtime(to_date, "%Y-%m-%d")
    resolution = resolution.strip("1")

    response = requests.get(
        f"https://finnhub.io/api/v1/stock/candle?symbol={ticker}&resolution={resolution}&from={fromdate}&to={todate}&token={api_key}"
    )

    if response.status_code == 429:
        _retries += 1
        if _retries >= 5:
            return None
        else:
            time.sleep(30)
            return get_finnhub_historical_data(
                ticker,
                api_key=api_key,
                from_date=from_date,
                resolution=resolution,
                _retries=_retries
            )

    elif response.status_code == 200:
        try:
            historical = (
                pd.DataFrame(eval(response.text))
                .rename(
                    columns={
                        "c": "close",
                        "h": "high",
                        "l": "low",
                        "o": "open",
                        "s": "status",
                        "t": "date",
                        "v": "volume",
                    }
                )
                .drop(columns=["status"])
            )
            historical["date"] = pd.to_datetime(historical["date"], unit="s")
            historical["symbol"] = ticker
            return [*historical.to_dict(orient="index").values()]
        except:
            return None

    else:
        raise ValueError(
            f"Unknown status code response of {response.status_code}. Returned error states: {response.text}"
        )
        
        
if __name__ == '__main__':
    
    import os
    from dotenv import load_dotenv, find_dotenv
    
    load_dotenv(find_dotenv())
    
    api_key = os.environ.get("FINNHUB_API_KEY")
    
    if api_key:
        print(get_finnhub_historical_data("SPY", os.environ["FINNHUB_API_KEY"]))
    else:
        raise ValueError("API Key not found")
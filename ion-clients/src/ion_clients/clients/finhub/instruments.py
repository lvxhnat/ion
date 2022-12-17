import os
import time
import requests
import pandas as pd
from functools import partial
from dotenv import load_dotenv
from typing import Union, List
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed

env_loaded = load_dotenv()


def get_finnhub_tickers_hd(
    tickers: List[str],
    from_date: str,
):

    promise = partial(get_finnhub_historical_data, from_date=from_date)
    data = []

    with ThreadPoolExecutor(max_workers=min(os.cpu_count() - 1, len(tickers))) as executor:

        future_promise = {
            executor.submit(promise, blob): blob for blob in tickers
        }

        for future in as_completed(future_promise):
            response = future.result()
            data.append(response)

    return data

def date_to_unixtime(date, datetime_format) -> int:
    """Return UNIX Time Stamp give a date and datetime format
    Parameters
    =============
    date -> [str]               : date string
    datetime_format -> [str]    : date string date format
    """
    d = datetime.strptime(date, datetime_format)
    unixtime = time.mktime(d.timetuple())
    return int(unixtime)


def get_finnhub_historical_data(
    ticker: str,
    api_key: str = os.environ["FINNHUB_API_KEY"],
    from_date: str = "2022-02-20",
    resolution: int = "D",
    data_format: str = "json",
) -> Union[pd.DataFrame, List[AssetHistoricalData]]:
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

    hist = requests.get(
        f"https://finnhub.io/api/v1/stock/candle?symbol={ticker}&resolution={resolution}&from={fromdate}&to={todate}&token={api_key}"
    ).text

    historical = (
        pd.DataFrame(eval(hist))
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
    historical["symbol"] = ticker

    if data_format == "json":
        return eval(historical.to_json(orient="table", index=False))["data"]

    elif data_format == "csv":
        historical.date = historical.date.apply(
            lambda ts: datetime.utcfromtimestamp(ts).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        )
        return historical

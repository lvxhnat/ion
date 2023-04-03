# Alphavantage scraper is written with explicit rate and multithread handlers.
import os
import csv
import logging
import requests
import numpy as np
import pandas as pd
from pydantic import BaseModel
from itertools import cycle
from dotenv import load_dotenv
from datetime import datetime
from typing import Union, List

from ion_clients.core.exceptions.api import RateLimitException

env_loaded = load_dotenv()
logger = logging.getLogger(__name__)
BASE_LOGGING_FORMAT = (
    "[%(asctime)s] %(levelname)-8s {%(name)s:%(lineno)d} - %(message)s"
)
logging.basicConfig(format=BASE_LOGGING_FORMAT)


class AssetHistoricalData(BaseModel):
    close: float
    high: float
    open: float
    low: float
    date: int
    volume: int
    symbol: str


class AlphaVantageClient:
    def __init__(self, api_keys: List[str]):
        """Keys has a rate limit of 500 per day"""
        self.APIKEYS = cycle(api_keys)
        self.APIKEY = next(self.APIKEYS)

    def get_historical_data(
        self,
        ticker: str,
        resolution: str = "5min",
        from_date: str = "2022-02-20",
        data_format: str = "json",
        retries: int = None,
    ) -> Union[pd.DataFrame, List[AssetHistoricalData]]:
        """Retrieve historical data from alpha vantage up to the last two years.

        Parameters
        =============
        ticker      : Ticker symbol.
        resolution  : Data interval 1min, 5min, 15min, 30min, 60min
        date_range  : Date in %Y-%m-%d

        Rate Limits
        =============
        5 API Calls / Minute
        500 API Calls / Day

        Example Usage
        =============
        >>> trading_client.get_historical_data( ticker="AAPL", from_date="2022-01-01", data_format = "csv")
        >>> date	            open	        high	        low	            close	        volume  symbol
        0	2021-11-08 20:00:00	121.381548423	121.381548423	121.381548423	121.381548423	130     AAPL
        1	2021-11-08 19:59:00	121.381645887	121.381645887	121.381645887	121.381645887	150     AAPL
        2	2021-11-08 19:45:00	121.381645887	121.381645887	121.381645887	121.381645887	553     AAPL
        3	2021-11-08 19:31:00	121.342660293	121.342660293	121.342660293	121.342660293	259     AAPL
        4	2021-11-08 19:21:00	121.381645887	121.381645887	121.381645887	121.381645887	100     AAPL

        """

        if retries is None:
            retries = self.keys_to_use

        def get_date_range(from_date: str):
            days = max(
                13 * 28,
                (
                    datetime.today() - datetime.strptime(from_date, "%Y-%m-%d")
                ).days,
            )
            months = np.ceil(days / 28).astype(int)
            return "year" + str(months // 12) + "month" + str(months % 12)

        resolution = resolution.strip(" ").lower()

        try:
            if "-" in from_date:
                date_range = get_date_range(from_date)
            else:
                date_range = from_date

            base_endpoint = "https://www.alphavantage.co/query?"
            endpoint = f"function=TIME_SERIES_INTRADAY_EXTENDED&symbol={ticker}&interval={resolution}&slice={date_range}&apikey={self.APIKEY}"

            url = base_endpoint + endpoint

            with requests.Session() as s:
                download = s.get(url)
                decoded_content = download.content.decode("utf-8")
                cr = csv.reader(decoded_content.splitlines(), delimiter=",")
                my_list = list(cr)

            df = pd.DataFrame(my_list[1:], columns=my_list[0]).rename(
                columns={"time": "date"}
            )
            df["symbol"] = ticker

            assert df.shape[0] > 0, "Empty dataframe"

            if data_format == "json":
                return eval(df.to_json(orient="table", index=False))["data"]

            elif data_format == "csv":
                return df

        except Exception as e:
            if retries == 0:
                raise RateLimitException

            else:
                logging.error(
                    "Rate limit reached on API Key. Rotating to next available key... ..."
                )
                self.APIKEY = next(self.APIKEYS)
                self.get_historical_data(
                    ticker=ticker,
                    resolution=resolution,
                    from_date=date_range,
                    data_format=data_format,
                    retries=retries - 1,
                )

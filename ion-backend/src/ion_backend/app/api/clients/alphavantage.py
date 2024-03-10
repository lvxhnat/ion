import os
import logging
import requests
import pandas as pd
from itertools import cycle
from dotenv import load_dotenv
from datetime import datetime
from typing import List

env_loaded = load_dotenv(".env.credentials")
logger = logging.getLogger(__name__)
BASE_LOGGING_FORMAT = (
    "[%(asctime)s] %(levelname)-8s {%(name)s:%(lineno)d} - %(message)s"
)
logging.basicConfig(format=BASE_LOGGING_FORMAT)


class AlphaVantageClient:
    def __init__(
        self,
        api_keys: List[str] = None,
    ):
        """Keys has a rate limit of 500 per day"""
        if api_keys:
            self.num_api_keys = len(api_keys)
            self.APIKEYS = cycle(api_keys)
        else:
            api_keys: List[str] = [
                os.environ[key]
                for key in [*os.environ.keys()]
                if "ALPHA_VANTAGE" in key
            ]
            self.num_api_keys = len(api_keys)
            self.APIKEYS = cycle(api_keys)

        self.APIKEY = next(self.APIKEYS)

    def get_historical_data(
        self,
        ticker: str,
        resolution: str = "5min",
        from_date: str = "2022-02-20",
        extended_hours: bool = False,
    ):
        """Retrieve historical data from alpha vantage up to the last two years.

        Parameters
        =============
        ticker      : Ticker symbol.
        resolution  : Data interval 1min, 5min, 15min, 30min, 60min, 1D
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

        resolution = resolution.strip(" ").upper()

        if "-" not in from_date:
            raise ValueError("Date is invalid")

        date_range = datetime.strptime(from_date, "%Y-%m-%d").strftime("%Y-%m")

        base_endpoint = "https://www.alphavantage.co/query?"

        if resolution != "1D":
            endpoint_type = "INTRADAY"
            endpoint = f"""function=TIME_SERIES_{endpoint_type}&symbol={ticker}&outputsize=full&interval={resolution}&month={date_range}&extended_hours={"true" if extended_hours else "false"}&apikey={self.APIKEY}"""
        else:
            endpoint_type = "DAILY"
            endpoint = f"""function=TIME_SERIES_{endpoint_type}&symbol={ticker}&outputsize=full&apikey={self.APIKEY}"""

        url = base_endpoint + endpoint

        with requests.Session() as s:
            d = s.get(url).json()

        self.APIKEY = next(self.APIKEYS)

        return d


def get_alphavantage_ticker_listings() -> pd.DataFrame:
    url = f"https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=I9PL1QLNCBPW0Q1H"
    r = requests.get(url)

    data = [i.split(",") for i in r.text.split("\r\n")]
    df: pd.DataFrame = pd.DataFrame(data[1:], columns=data[0]).dropna()
    return df[df["name"].apply(lambda x: x.strip() != "")][
        ["symbol", "name", "assetType"]
    ].rename(columns={"assetType": "asset_class"})

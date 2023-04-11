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
from typing import Union, List, Optional

from ion_clients.core.utils.scraper.retry_handler import retry

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

class CompanyOverview(BaseModel):
    Symbol: str
    AssetType: str
    Name: str
    Description: str
    CIK: int
    Exchange: str
    Currency: str
    Country: str
    Sector: str
    Industry: str
    Address: str
    FiscalYearEnd: str
    LatestQuarter: str
    MarketCapitalization: int
    EBITDA: int
    PERatio: float
    PEGRatio: float
    BookValue: float
    DividendPerShare: int
    DividendYield: int
    EPS: float
    RevenuePerShareTTM: float
    ProfitMargin: float
    OperatingMarginTTM: float
    ReturnOnAssetsTTM: float
    ReturnOnEquityTTM: float
    RevenueTTM: int
    GrossProfitTTM: int
    DilutedEPSTTM: float
    QuarterlyEarningsGrowthYOY: float
    QuarterlyRevenueGrowthYOY: float
    AnalystTargetPrice: float
    TrailingPE: float
    ForwardPE: float
    PriceToSalesRatioTTM: float
    PriceToBookRatio: float
    EVToRevenue: float
    EVToEBITDA: float
    Beta: float
    "52WeekHigh": float
    "52WeekLow": float
    "50DayMovingAverage": float
    "200DayMovingAverage": float
    SharesOutstanding: int
    DividendDate: Optional[str]
    ExDividendDate: Optional[str]
  
class AlphaVantageClient:
    def __init__(
        self,
        api_keys: List[str] = None,
    ):
        """Keys has a rate limit of 500 per day"""
        self.num_api_keys = len(api_keys)
        if api_keys:
            self.APIKEYS = cycle(api_keys)
        else:
            self.APIKEYS = cycle(
                [
                    os.environ[key]
                    for key in [*os.environ.keys()]
                    if "ALPHA_VANTAGE" in key
                ]
            )
            self.APIKEYS = cycle()

        self.APIKEY = next(self.APIKEYS)

    def get_date_range(self, from_date: str):
        days = max(
            13 * 28,
            (datetime.today() - datetime.strptime(from_date, "%Y-%m-%d")).days,
        )
        months = np.ceil(days / 28).astype(int)
        return "year" + str(months // 12) + "month" + str(months % 12)

    @retry(retries=10)
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

        resolution = resolution.strip(" ").lower()

        if "-" in from_date:
            date_range = self.get_date_range(from_date)
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

        self.APIKEY = next(self.APIKEYS)

        df = pd.DataFrame(my_list[1:], columns=my_list[0]).rename(
            columns={"time": "date"}
        )
        df["symbol"] = ticker

        assert df.shape[0] > 0, "Empty dataframe"

        if data_format == "json":
            return eval(df.to_json(orient="table", index=False))["data"]

        elif data_format == "csv":
            return df

    @retry(retries=10)
    def get_company_overview(self, ticker: str):
        r = requests.get(
            f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={ticker}&apikey={self.APIKEY}"
        )
        self.APIKEY = next(self.APIKEYS)
        r_json: CompanyOverview = r.json()
        return pd.DataFrame.from_dict(r_json, orient = "index").T

    @retry(retries=10)
    def get_ticker_listings(
        self,
    ) -> pd.DataFrame:

        url = f"https://www.alphavantage.co/query?function=LISTING_STATUS&apikey={self.APIKEY}"
        r = requests.get(url)
        self.APIKEY = next(self.APIKEYS)

        data = [i.split(",") for i in r.text.split("\r\n")]
        return pd.DataFrame(data[1:], columns=data[0]).dropna()

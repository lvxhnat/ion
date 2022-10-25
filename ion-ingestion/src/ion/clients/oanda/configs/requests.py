#!/usr/bin/env python3

import os
import enum
from datetime import timedelta
from dotenv import load_dotenv

__ENV_LOADED: bool = load_dotenv()


class CurrencyPairs(enum.Enum):
    """Supported Currency Pairs by Oanda Instruments Candles Endpoint"""

    AUD_CAD = "AUD_CAD"
    AUD_CHF = "AUD_CHF"
    AUD_HKD = "AUD_HKD"
    AUD_JPY = "AUD_JPY"
    AUD_NZD = "AUD_NZD"
    AUD_SGD = "AUD_SGD"
    AUD_USD = "AUD_USD"
    CAD_CHF = "CAD_CHF"
    CAD_HKD = "CAD_HKD"
    CAD_JPY = "CAD_JPY"
    CAD_SGD = "CAD_SGD"
    CHF_HKD = "CHF_HKD"
    CHF_JPY = "CHF_JPY"
    CHF_ZAR = "CHF_ZAR"
    EUR_AUD = "EUR_AUD"
    EUR_CAD = "EUR_CAD"
    EUR_CHF = "EUR_CHF"
    EUR_CZK = "EUR_CZK"
    EUR_DKK = "EUR_DKK"
    EUR_GBP = "EUR_GBP"
    EUR_HKD = "EUR_HKD"
    EUR_HUF = "EUR_HUF"
    EUR_JPY = "EUR_JPY"
    EUR_NOK = "EUR_NOK"
    EUR_NZD = "EUR_NZD"
    EUR_PLN = "EUR_PLN"
    EUR_SEK = "EUR_SEK"
    EUR_SGD = "EUR_SGD"
    EUR_TRY = "EUR_TRY"
    EUR_USD = "EUR_USD"
    EUR_ZAR = "EUR_ZAR"
    GBP_AUD = "GBP_AUD"
    GBP_CAD = "GBP_CAD"
    GBP_CHF = "GBP_CHF"
    GBP_HKD = "GBP_HKD"
    GBP_JPY = "GBP_JPY"
    GBP_NZD = "GBP_NZD"
    GBP_PLN = "GBP_PLN"
    GBP_SGD = "GBP_SGD"
    GBP_USD = "GBP_USD"
    GBP_ZAR = "GBP_ZAR"
    HKD_JPY = "HKD_JPY"
    NZD_CAD = "NZD_CAD"
    NZD_CHF = "NZD_CHF"
    NZD_HKD = "NZD_HKD"
    NZD_JPY = "NZD_JPY"
    NZD_SGD = "NZD_SGD"
    NZD_USD = "NZD_USD"
    SGD_CHF = "SGD_CHF"
    SGD_JPY = "SGD_JPY"
    TRY_JPY = "TRY_JPY"
    USD_CAD = "USD_CAD"
    USD_CHF = "USD_CHF"
    USD_CNH = "USD_CNH"
    USD_CZK = "USD_CZK"
    USD_DKK = "USD_DKK"
    USD_HKD = "USD_HKD"
    USD_HUF = "USD_HUF"
    USD_JPY = "USD_JPY"
    USD_MXN = "USD_MXN"
    USD_NOK = "USD_NOK"
    USD_PLN = "USD_PLN"
    USD_SEK = "USD_SEK"
    USD_SGD = "USD_SGD"
    USD_THB = "USD_THB"
    USD_TRY = "USD_TRY"
    USD_ZAR = "USD_ZAR"
    ZAR_JPY = "ZAR_JPY"


class Granularities(enum.Enum):
    """Supported Granularities by Oanda Instruments Candles Endpoint"""

    S5 = timedelta(seconds=5)
    S10 = timedelta(seconds=10)
    S15 = timedelta(seconds=15)
    S30 = timedelta(seconds=30)
    M1 = timedelta(minutes=1)
    M2 = timedelta(minutes=2)
    M4 = timedelta(minutes=4)
    M5 = timedelta(minutes=5)
    M10 = timedelta(minutes=10)
    M15 = timedelta(minutes=15)
    M30 = timedelta(minutes=30)
    H1 = timedelta(hours=1)
    H2 = timedelta(hours=2)
    H3 = timedelta(hours=3)
    H4 = timedelta(hours=4)
    H6 = timedelta(hours=6)
    H8 = timedelta(hours=8)
    H12 = timedelta(hours=12)
    D = timedelta(days=1)
    W = timedelta(weeks=1)
    M = timedelta(weeks=4)

    @classmethod
    def is_supported(cls, granularity: str) -> bool:
        """Checks if the granularity is supported by Oanda"""
        if isinstance(granularity, cls):
            granularity = granularity.value
        if not granularity in cls.__members__:
            return False
        else:
            return True


ENDPOINTS = {
    "BASE_URL": "https://api-fxtrade.oanda.com",
    "ENDPOINTS": {
        "INSTRUMENTS": {
            "PRICESTREAM": lambda symbol: f"""https://stream-fxtrade.oanda.com/v3/accounts/{os.environ['OANDA_ACCOUNT_ID']}/pricing/stream?instruments={"%2C".join(symbol)}""",
            "CANDLES": lambda symbol: "/v3/instruments/" + symbol + "/candles",
        }
    },
}

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + os.environ.get("OANDA_LIVE_API_KEY"),
}

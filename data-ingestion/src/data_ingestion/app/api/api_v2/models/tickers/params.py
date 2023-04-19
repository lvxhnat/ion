from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from ion_clients.clients.oanda.types.candles import (
    OandaReqCurrencies,
    OandaReqIntervals,
    OandaReqGranularities,
)


class HistoricalEquityParams(BaseModel):

    tickers: List[str]
    from_date: Optional[str]
    to_date: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "tickers": ["AAPL"],
                "from_date": "2023-01-01",
            }
        }


class HistoricalForexParams(BaseModel):
    symbol: OandaReqCurrencies
    count: Optional[int] = 5000
    to_date: Optional[datetime]
    from_date: Optional[datetime]
    period: Optional[OandaReqIntervals]
    granularity: Optional[OandaReqGranularities]

    class Config:
        schema_extra = {
            "example": {
                "symbol": "EUR_USD",
                "count": 1000,
                "granularity": "S5",
            }
        }

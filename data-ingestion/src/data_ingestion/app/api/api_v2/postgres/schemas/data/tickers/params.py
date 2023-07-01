from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from ion_clients.clients.oanda.types.candles import (
    OandaReqCurrencies,
    OandaReqIntervals,
    OandaReqGranularities,
)


class ETFInfoParams(BaseModel):
    ticker: str


class ETFInfosParams(BaseModel):
    pass


class HistoricalEquityParams(BaseModel):

    symbol: str
    from_date: Optional[str]
    to_date: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "symbol": "AAPL",
                "from_date": "2023-01-01",
            }
        }


class HistoricalForexParams(BaseModel):
    symbol: OandaReqCurrencies
    count: Optional[int]
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

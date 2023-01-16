from pydantic import BaseModel
from ion_clients.clients.oanda.types.candles import (
    OandaReqCurrencies,
    OandaReqIntervals,
    OandaReqGranularities,
)


class LiveCandles(BaseModel):
    symbol: OandaReqCurrencies
    period: OandaReqIntervals
    
    
class HistoricalCandles(BaseModel):
    symbol: OandaReqCurrencies
    from_date: str 
    to_date: str 
    granularity: OandaReqGranularities
    
    class Config: 
        schema_extra = {
            "example": {
                "symbol": "EUR_USD",
                "from_date": "2022-01-01",
                "to_date": "2022-12-31",
                "granularity": "S5",
            }
        }
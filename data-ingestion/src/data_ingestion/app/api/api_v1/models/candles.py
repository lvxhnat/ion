from pydantic import BaseModel
from ion_clients.clients.oanda.types.candles import (
    OandaReqCurrencies,
    OandaReqIntervals,
)


class LiveCandles(BaseModel):
    symbol: OandaReqCurrencies
    period: OandaReqIntervals

from pydantic import BaseModel
from ion_clients.types.oanda import OandaReqCurrencies, OandaReqIntervals


class LiveCandles(BaseModel):
    symbol: OandaReqCurrencies
    period: OandaReqIntervals

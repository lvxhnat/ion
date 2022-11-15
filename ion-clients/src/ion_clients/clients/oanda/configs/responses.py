#!/usr/bin/env python3
from typing import List

from ion_clients.clients.configuration.candles import (
    BaseCandlesResponseModel,
    BaseCandlesDataModel,
)
from ion_clients.clients.oanda.configs.requests import (
    Granularities,
    CurrencyPairs,
)
from pydantic import BaseModel
from typing import Literal, Optional


class _OandaLiveStreamBidAskItem(BaseModel):
    price: str
    liquidity: int


class OandaLiveStreamResponse(BaseModel):
    type: str
    time: str
    bids: List[_OandaLiveStreamBidAskItem]
    asks: List[_OandaLiveStreamBidAskItem]
    closeoutBid: str
    closeoutAsk: str
    status: str
    tradeable: bool
    instrument: str


class _OandaOHLCResponse(BaseModel):
    o: str
    h: str
    l: str
    c: str


class OandaCandlesResponse(BaseModel):
    """Candles Response"""

    complete: bool
    volume: int
    time: str
    bid: Optional[_OandaOHLCResponse]
    mid: Optional[_OandaOHLCResponse]
    ask: Optional[_OandaOHLCResponse]


class FormattedOandaCandles(BaseCandlesDataModel):
    """The formatted response returned from instrument candles endpoint"""

    bid_open: Optional[float]
    bid_high: Optional[float]
    bid_low: Optional[float]
    bid_close: Optional[float]
    ask_open: Optional[float]
    ask_high: Optional[float]
    ask_low: Optional[float]
    ask_close: Optional[float]


class OandaBaseDataResponse(BaseCandlesResponseModel):
    """The response the function will return, together with metadata"""

    data: Optional[FormattedOandaCandles]
    response_code: Literal[200]
    symbol: CurrencyPairs
    granularity: Granularities
    error_message: str

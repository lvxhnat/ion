from typing import List
from datetime import datetime
from pydantic import BaseModel

class HistoricalCandlesDTO(BaseModel):
    symbol: str
    date: datetime
    volume: int
    open: float
    high: float
    low: float
    close: float

class HistoricalForexDTO(HistoricalCandlesDTO):
    pass

class HistoricalEquityDTO(BaseModel): 
    data: List[HistoricalCandlesDTO]
    source: str
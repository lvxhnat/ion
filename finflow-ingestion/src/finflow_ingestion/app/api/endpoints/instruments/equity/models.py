from pydantic import BaseModel

class EquityHistoricalModel(BaseModel):
    close: float
    high: float
    open: float
    low: float
    date: int
    volume: int
    symbol: str

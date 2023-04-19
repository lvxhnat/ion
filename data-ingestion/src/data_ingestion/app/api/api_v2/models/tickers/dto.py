from datetime import datetime
from pydantic import BaseModel


class HistoricalForexDTO(BaseModel):
    date: datetime
    vol: int
    open: float
    high: float
    low: float
    close: float

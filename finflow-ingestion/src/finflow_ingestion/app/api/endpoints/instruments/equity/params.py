from pydantic import BaseModel
from typing import Optional, Literal

class HistoricalEquityParams(BaseModel):

    symbol: str
    from_date: Optional[str]
    to_date: Optional[str]
    data_source: Literal["finnhub"]

    class Config:
        schema_extra = {
            "example": {
                "symbol": "AAPL",
                "from_date": "2023-01-01",
            }
        }

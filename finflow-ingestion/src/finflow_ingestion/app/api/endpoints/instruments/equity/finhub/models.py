from pydantic import BaseModel

class AssetHistoricalData(BaseModel):
    # Data Returned directly from the scrapers
    close: float
    high: float
    open: float
    low: float
    date: int
    volume: int
    symbol: str
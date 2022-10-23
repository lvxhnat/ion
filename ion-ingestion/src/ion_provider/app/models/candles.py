from pydantic import BaseModel 


class LiveCandles(BaseModel):
    symbol: str 
    granularity: str
from pydantic import BaseModel

class ETFQueryParams(BaseModel):
    ticker: str
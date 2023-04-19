from typing import Optional, List
from pydantic import BaseModel

class QueryModel(BaseModel):
    query: str

class SecurityFunctionsParams(QueryModel):
    pass

class TradeableAssetsParams(BaseModel):
    query_type: Optional[str]
    query_tick: Optional[str]
    
class ETFInfoRequestParams(BaseModel):
    request: dict
from typing import Optional, List
from pydantic import BaseModel


class QueryModel(BaseModel):
    query: str


class SecurityFunctions(QueryModel):
    pass


class TradeableAssets(BaseModel):
    query_type: Optional[str]
    query_tick: Optional[str]
    
    
class ETFInfoRequest(BaseModel):
    request: dict

class ETFInfoTable(BaseModel):
    ticker: str
    issuer: str
    brand: str
    structure: str
    expense_ratio: str
    etf_home_page: str
    inception: str
    index_tracked: str
    category: str
    asset_class: str
    asset_class_size: str
    asset_class_style: str
    region_general: str
    region_specific: str
    segment: str
    focus: str
    niche: str
    strategy: str
    weighting_scheme: str
    description: str
    alternative_etfs: List[str]
    other_alternative_etfs: List[str]

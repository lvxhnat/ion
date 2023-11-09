from pydantic import BaseModel

class GetPortfolioEntriesParams(BaseModel):
    portfolio_id: str
    
class CreatePortfolioParams(BaseModel):
    portfolio_id: str
    name: str
    description: str
    currency: str
    creation_date: str
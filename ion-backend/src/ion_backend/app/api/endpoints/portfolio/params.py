from pydantic import BaseModel
from datetime import datetime


class CreateUserPortfolioParams(BaseModel):
    user_id: str
    portfolio_name: str


class CreateTransactionParams(BaseModel):
    transaction_id: str
    portfolio_id: str
    ticker: str
    transaction_date: datetime
    fees: float
    execution_price: float
    units: int
    type: str
    broker: str
    remarks: str

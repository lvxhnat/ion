from pydantic import BaseModel
from datetime import datetime


class CreateUserPortfolioParams(BaseModel):
    user_id: str
    portfolio_name: str


class TransactionParams(BaseModel):
    transaction_id: str
    portfolio_id: str
    ticker: str
    units: int
    type: str
    remarks: str


class CreateTransactionParams(TransactionParams):
    pass

from pydantic import BaseModel


class CreateUserPortfolioParams(BaseModel):
    user_id: str
    portfolio_name: str

from pydantic import BaseModel
from datetime import datetime


class UserPortfolio(BaseModel):
    portfolio_id: str
    user_id: str
    name: str
    created_at: datetime
    last_modified: datetime

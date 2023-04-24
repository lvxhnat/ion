from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class PortfolioParams(BaseModel):
    uuid: str
    name: str
    description: Optional[str]
    currency: str
    creation_date: datetime
    last_updated: datetime

    class Config:
        orm_mode = True

from typing import Optional, Literal
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
        ## https://docs.pydantic.dev/usage/models/#orm-mode-aka-arbitrary-class-instances
        ## Pydantic models can be created from arbitrary class instances to support models that map to ORM objects.
        orm_mode = True

    def dict(
        self,
    ):
        return {
            "uuid": self.uuid,
            "name": self.name,
            "description": self.description,
            "currency": self.currency,
            "creation_date": self.creation_date,
            "last_updated": self.last_updated,
        }


class PortfolioTransactionParams(BaseModel):
    asset_id: str
    asset_type: str
    broker: Optional[str]
    comission: Optional[float]
    currency: Optional[str]
    exchange: Optional[str]
    portfolio_id: str
    price_purchased: Optional[float]
    quantity: Optional[int]
    transaction_date: Optional[datetime]
    uuid: str

    class Config:
        ## https://docs.pydantic.dev/usage/models/#orm-mode-aka-arbitrary-class-instances
        ## Pydantic models can be created from arbitrary class instances to support models that map to ORM objects.
        orm_mode = True

    def dict(
        self,
    ):
        return {
            "asset_id": self.asset_id,
            "asset_type": self.asset_type,
            "broker": self.broker,
            "comission": self.comission,
            "currency": self.currency,
            "exchange": self.exchange,
            "portfolio_id": self.portfolio_id,
            "price_purchased": self.price_purchased,
            "quantity": self.quantity,
            "transaction_date": self.transaction_date,
            "uuid": self.uuid,
        }

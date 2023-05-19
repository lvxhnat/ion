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


class PortfolioAssetParams(BaseModel):
    uuid: str
    portfolio_id: str
    asset_id: str
    asset_type: str
    quantity: int
    position: str
    currency: str
    account: str
    price_purchased: float
    fx_rate: Optional[float]
    transaction_date: Optional[datetime]

    class Config:
        ## https://docs.pydantic.dev/usage/models/#orm-mode-aka-arbitrary-class-instances
        ## Pydantic models can be created from arbitrary class instances to support models that map to ORM objects.
        orm_mode = True

    def dict(
        self,
    ):
        return {
            "uuid": self.uuid,
            "portfolio_id": self.portfolio_id,
            "asset_id": self.asset_id,
            "asset_type": self.asset_type,
            "quantity": self.quantity,
            "position": self.position,
            "price_purchased": self.price_purchased,
            "currency": self.currency,
            "account": self.account,
            "fx_rate": self.fx_rate,
            "transaction_date": self.transaction_date,
        }

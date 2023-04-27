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

    def dict(self, ):
        return {
            "uuid": self.uuid, 
            "name": self.name,
            "description": self.description, 
            "currency": self.currency, 
            "creation_date": self.creation_date, 
            "last_updated": self.last_updated,
        }

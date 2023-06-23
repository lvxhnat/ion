from pydantic import BaseModel
from datetime import datetime


class WatchlistParams(BaseModel):
    symbol: str
    date_added: datetime
    source: str

    class Config:
        ## https://docs.pydantic.dev/usage/models/#orm-mode-aka-arbitrary-class-instances
        ## Pydantic models can be created from arbitrary class instances to support models that map to ORM objects.
        orm_mode = True

    def dict(
        self,
    ):
        return {
            "symbol": self.symbol,
            "date_added": self.date_added,
            "source": self.source,
        }

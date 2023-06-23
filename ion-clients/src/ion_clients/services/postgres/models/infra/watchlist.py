from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime

from ion_clients.services.postgres.models.base import Base
from ion_clients.services.postgres.models.data.trading import AssetMetaData


class Watchlist(Base):
    __tablename__ = "watchlist"
    symbol: str = Column(
        String,
        nullable=False,
        primary_key=True,
    )
    source: str = Column(
        String,
        nullable=False,
    )
    date_added: datetime = Column(
        DateTime,
        nullable=False,
    )

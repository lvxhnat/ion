from datetime import datetime
from sqlalchemy import Column, String, DateTime

from ion_clients.services.postgres.models.base import Base


class Watchlist(Base):
    __tablename__ = "watchlist"
    uuid: str = Column(
        String,
        nullable=False,
        primary_key=True,
    )
    symbol: str = Column(
        String,
        nullable=False,
    )
    source: str = Column(
        String,
        nullable=False,
    )
    asset_type: str = Column(
        String,
        nullable=False,
    )
    date_added: datetime = Column(
        DateTime,
        nullable=False,
    )

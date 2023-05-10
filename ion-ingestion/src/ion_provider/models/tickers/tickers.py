from datetime import datetime
from sqlalchemy import Column, String, DateTime

from ion_provider.models.base import Base


class AssetMetaData(Base):
    __tablename__ = "asset_metadata"
    last_updated: datetime = Column(DateTime, nullable=False)
    symbol: str = Column(String, primary_key=True)
    asset_class: str = Column(String, nullable=True)
    ipo_date: datetime = Column(DateTime, nullable=True)
    name: str = Column(String, nullable=False)
    exchange: str = Column(String, nullable=True)
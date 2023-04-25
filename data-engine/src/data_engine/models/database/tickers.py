from datetime import datetime
from sqlalchemy import Column, String, DateTime

from data_engine.models.base import Base


class AssetMetaData(Base):
    __tablename__ = "asset_metadata"
    symbol: str = Column(String, primary_key=True)
    asset_class: str = Column(String, nullable=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    ipo_date: datetime = Column(DateTime, nullable=True)
    name: str = Column(String, nullable=False)
    exchange: str = Column(String, nullable=True)

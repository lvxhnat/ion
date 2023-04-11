import numpy as np
from datetime import datetime
from sqlalchemy import Column, Float, String, DateTime, ForeignKey

from ion_clients.services.postgres.schemas.base import Base


class AssetMetaData(Base):
    __tablename__ = "asset_metadata"
    symbol: str = Column(String, primary_key=True)
    asset_class: str = Column(String, nullable=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    ipo_date: datetime = Column(DateTime, nullable=True)
    name: str = Column(String, nullable=False)
    exchange: str = Column(String, nullable=True)


class EquityMetaData(Base):
    __tablename__ = "equity_metadata"
    symbol: str = Column(
        String,
        ForeignKey(AssetMetaData.symbol),
        nullable=False,
        primary_key=True,
    )
    description: str = Column(String, nullable=True)
    sector: str = Column(String, nullable=False)
    industry: str = Column(String, nullable=False)
    currency: str = Column(String, nullable=False)
    country: str = Column(String, nullable=False)


class ETFMetaData(Base):
    __tablename__ = "etf_metadata"
    symbol: str = Column(
        String,
        ForeignKey(AssetMetaData.symbol),
        nullable=False,
        primary_key=True,
    )
    description: str = Column(String, nullable=True)
    issuer: str = Column(String, nullable=False)
    expense_ratio: float = Column(Float, nullable=False)
    index_tracked: str = Column(String, nullable=False)
    asset_class_category: str = Column(String, nullable=False)
    asset_class_size: str = Column(String, nullable=False)
    asset_class_style: str = Column(String, nullable=False)
    strategy: str = Column(String, nullable=False)
    weighting_scheme: str = Column(String, nullable=False)

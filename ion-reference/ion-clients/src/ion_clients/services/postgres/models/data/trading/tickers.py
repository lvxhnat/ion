import numpy as np
from datetime import datetime
from sqlalchemy import Column, Float, String, DateTime, ForeignKey

from ion_clients.services.postgres.models.base import Base


class AssetMetaData(Base):
    __tablename__ = "asset_metadata"
    symbol: str = Column(String, primary_key=True)
    asset_class: str = Column(String, nullable=True)
    name: str = Column(String, nullable=False)
    last_updated: datetime = Column(DateTime, nullable=False)
    source: str = Column(String, nullable=False)


class EquityMetaData(Base):
    __tablename__ = "equity_metadata"
    symbol: str = Column(
        String,
        ForeignKey(AssetMetaData.symbol),
        nullable=False,
        primary_key=True,
    )
    last_updated: datetime = Column(DateTime, nullable=False)
    description: str = Column(String, nullable=False)
    cik: str = Column(String, nullable=False)
    sector: str = Column(String, nullable=False)
    industry: str = Column(String, nullable=False)
    currency: str = Column(String, nullable=False)
    country: str = Column(String, nullable=False)
    ipo_date: datetime = Column(DateTime, nullable=True)
    exchange: str = Column(String, nullable=True)


class ETFMetaData(Base):
    __tablename__ = "etf_metadata"
    symbol: str = Column(
        String,
        ForeignKey(AssetMetaData.symbol),
        nullable=False,
        primary_key=True,
    )
    last_updated: datetime = Column(DateTime, nullable=False)
    description: str = Column(String, nullable=True)
    aum: float = Column(Float, nullable=True)
    expense_ratio: float = Column(Float, nullable=True)
    issuer: str = Column(String, nullable=True)
    inception: datetime = Column(DateTime, nullable=True)
    index_tracked: str = Column(String, nullable=True)
    category: str = Column(String, nullable=True)
    asset_class: str = Column(String, nullable=True)
    region: str = Column(String, nullable=True)
    segment: str = Column(String, nullable=True)
    strategy: str = Column(String, nullable=True)


class ETFHoldings(Base):
    __tablename__ = "etf_holdings"
    uuid: str = Column(String, nullable=False, primary_key=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    symbol: str = Column(
        String, ForeignKey(ETFMetaData.symbol), nullable=False
    )
    holding_symbol: str = Column(String, nullable=True)
    holding_name: str = Column(String, nullable=False)
    share: float = Column(Float, nullable=False)

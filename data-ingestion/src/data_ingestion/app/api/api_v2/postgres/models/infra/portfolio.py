from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, Float, ForeignKey

from data_ingestion.app.api.api_v2.postgres.models.base import Base


class Portfolio(Base):
    __tablename__ = "portfolio"
    uuid: str = Column(String, primary_key=True)
    name: str = Column(String, nullable=False)
    description: str = Column(String, nullable=True)
    currency: str = Column(String, nullable=False)
    creation_date: str = Column(DateTime, nullable=False)
    last_updated: str = Column(DateTime, nullable=False)


class PortfolioAssets(Base):
    __tablename__ = "portfolio_assets"
    
    uuid: str = Column(String, primary_key=True)
    
    portfolio_id: str = Column(String, ForeignKey(Portfolio.uuid), nullable = False)
    asset_id: str = Column(String, nullable = False)
    
    asset_type: str = Column(String, nullable=False)
    quantity: int = Column(Integer, nullable=False)
    position: str = Column(String, nullable=False)
    price_purchased: float = Column(Float, nullable=False)
    currency: str = Column(String, nullable=False)
    
    account: str = Column(String, nullable = True)
    fx_rate: float = Column(Float, nullable=True)
    transaction_date: datetime = Column(DateTime, nullable=True)

    
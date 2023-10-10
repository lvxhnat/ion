from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from ion_clients.services.postgres.models.base import Base


class Portfolio(Base):
    __tablename__ = "portfolio"
    uuid: str = Column(String, primary_key=True)
    name: str = Column(String, nullable=False)
    description: str = Column(String, nullable=True)
    currency: str = Column(String, nullable=False)
    creation_date: str = Column(DateTime, nullable=False)
    last_updated: str = Column(DateTime, nullable=False)

    portfolio_transactions = relationship(
        "PortfolioTransactions",
        back_populates="portfolio",
        cascade="all, delete-orphan",
    )
    portfolio_cashflow = relationship(
        "PortfolioCashflow",
        back_populates="portfolio",
        cascade="all, delete-orphan",
    )


class PortfolioTransactions(Base):
    __tablename__ = "portfolio_transactions"
    uuid: str = Column(String, primary_key=True)
    portfolio_id: str = Column(
        String, ForeignKey(Portfolio.uuid), nullable=False
    )
    asset_id: str = Column(String, nullable=False)
    asset_type: str = Column(String, nullable=False)
    quantity: int = Column(Integer, nullable=False)
    price_purchased: float = Column(Float, nullable=False)
    currency: str = Column(String, nullable=False)
    broker: str = Column(String, nullable=True)
    exchange: str = Column(String, nullable=True)
    comission: float = Column(Float, nullable=True)
    transaction_date: datetime = Column(DateTime, nullable=True)

    portfolio = relationship(
        "Portfolio", back_populates="portfolio_transactions"
    )


class PortfolioCashflow(Base):
    __tablename__ = "portfolio_cashflow"
    uuid: str = Column(String, primary_key=True)
    portfolio_id: str = Column(
        String, ForeignKey(Portfolio.uuid), nullable=False
    )
    amount: str = Column(Float, nullable=False)
    broker: str = Column(String, nullable=True)
    transaction_date: datetime = Column(DateTime, nullable=True)

    portfolio = relationship("Portfolio", back_populates="portfolio_cashflow")

import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime, Numeric

from ion_backend.app.services.postgres.base import Base, TimeStamps


class PortfolioTickers(Base, TimeStamps):
    __tablename__ = "portfolio_tickers"
    transaction_id = Column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    portfolio_id = Column(
        String(36),
        ForeignKey(
            "user_portfolios.portfolio_id",
            onupdate="CASCADE",
            ondelete="CASCADE",
        ),
        nullable=False,
    )
    ticker = Column(String(25), nullable=False)
    units = Column(Numeric(10, 2), nullable=False)
    type = Column(String(8), nullable=False)
    remarks = Column(String)

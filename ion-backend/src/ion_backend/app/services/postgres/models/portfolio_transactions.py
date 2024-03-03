import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime, Numeric

from ion_backend.app.services.postgres.base import Base, TimeStamps


class PortfolioTransactions(Base, TimeStamps):
    __tablename__ = "portfolio_transactions"
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
    ticker = Column(String(10), nullable=False)
    transaction_date = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
    fees = Column(Numeric(10, 5), nullable=False)
    execution_price = Column(Numeric(15, 5), nullable=False)
    units = Column(Numeric(10, 2), nullable=False)
    type = Column(String(4), nullable=False)
    broker = Column(String)
    remarks = Column(String)

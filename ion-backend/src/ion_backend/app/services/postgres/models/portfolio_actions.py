import uuid
from datetime import datetime
from sqlalchemy import Column, String, ForeignKey, DateTime, Numeric

from ion_backend.app.services.postgres.base import Base, TimeStamps


class PortfolioActions(Base, TimeStamps):
    __tablename__ = "portfolio_actions"
    action_id = Column(
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
    action = Column(String, nullable=False)
    action_date = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
    value = Column(Numeric(15, 5), nullable=False)
    currency = Column(String(3), nullable=False)

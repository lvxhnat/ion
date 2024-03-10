import uuid
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, ForeignKey

from ion_backend.app.services.postgres.base import Base, TimeStamps


class UserPortfolios(Base, TimeStamps):
    __tablename__ = "user_portfolios"
    portfolio_id = Column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id = Column(
        String(36),
        ForeignKey("users.user_id", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )
    name = Column(String, nullable=False)
    description = Column(String)
    portfolio_transactions = relationship(
        "PortfolioTickers", backref="user_portfolios"
    )

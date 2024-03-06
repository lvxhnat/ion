import uuid
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String

from ion_backend.app.services.postgres.base import Base, TimeStamps


class Users(Base, TimeStamps):
    __tablename__ = "users"
    user_id = Column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    email = Column(String, nullable=False)
    user_portfolios = relationship("UserPortfolios", backref="users")

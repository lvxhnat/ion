import numpy as np
from sqlalchemy import Column, String, DateTime

from ion_clients.services.postgres.schemas.base import Base


class Portfolio(Base):
    __tablename__ = "portfolio"
    uuid: str = Column(String, primary_key=True)
    name: str = Column(String, nullable=False)
    description: str = Column(String, nullable=True)
    currency: str = Column(String, nullable=False)
    creation_date: str = Column(DateTime, nullable=False)
    last_updated: str = Column(DateTime, nullable=False)

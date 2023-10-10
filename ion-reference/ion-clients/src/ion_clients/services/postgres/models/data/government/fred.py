from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime

from ion_clients.services.postgres.models.base import Base


class FredMetaData(Base):
    __tablename__ = "fred_metadata"
    id: int = Column(Integer, primary_key=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    parent_id: int = Column(Integer, nullable=False)
    name: str = Column(String, nullable=False)

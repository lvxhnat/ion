from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class FredMetaData(Base):
    __tablename__ = "fred_metadata"
    id: int = Column(Integer, primary_key=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    parent_id: int = Column(Integer, nullable=False)
    name: str = Column(String, nullable=False)

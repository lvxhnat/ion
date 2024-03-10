import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime

from ion_backend.app.services.postgres.base import Base, TimeStamps


class EconomicCalendar(Base, TimeStamps):
    __tablename__ = "economic_calendar"
    entry_id = Column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    fred_release_id: str = Column(String, nullable=False)
    name: str = Column(String, nullable=False)
    date = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

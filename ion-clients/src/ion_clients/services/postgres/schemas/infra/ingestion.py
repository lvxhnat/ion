import numpy as np
from datetime import datetime
from sqlalchemy import Column, Float, String, Date, Integer

from ion_clients.services.postgres.schemas.base import Base


class UserUploadTables(Base):
    __tablename__ = "user_tables"
    table_id: np.float16 = Column(
        String(32), nullable=False, primary_key=True
    )  ## uuid-v4
    user_id: str = Column(String(36), nullable=False)
    file_name: str = Column(String(100), nullable=False)
    file_size: int = Column(Integer, nullable=False)
    file_format: str = Column(String(20), nullable=False)
    upload_date: datetime = Column(
        Date, nullable=False, default=datetime.utcnow
    )

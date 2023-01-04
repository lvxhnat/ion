import numpy as np
from sqlalchemy import Column, Float, String, Integer

from ion_clients.services.postgres.schemas.base import Base


class UserTables(Base):
    __tablename__ = "user_tables"
    user_id: np.float32 = Column(String(25), nullable=False)
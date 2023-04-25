import numpy as np
from sqlalchemy import Column, Float, String, Integer

from data_engine.models.base import Base

class AreaLatLon(Base):
    __tablename__ = "global_area_latlon"
    uuid: str = Column(String, primary_key=True)
    name: str = Column(String, nullable=False)
    latitude: np.float32 = Column(Float, nullable=False)
    longitude: np.float32 = Column(Float, nullable=False)
    country_code: str = Column(String, nullable=False)
    population: np.int32 = Column(Integer, nullable=False)
    dem: np.int16 = Column(Integer, nullable=False)
    timezone: str = Column(String, nullable=False)

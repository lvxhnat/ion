from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey

from ion_clients.services.postgres.models.base import Base

class ESRRegionType(Base):
    __tablename__ = "esr_region_type"
    region_id: str = Column(String, primary_key=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    region_name: str = Column(String, nullable=False)
    
class ESRCountryType(Base):
    __tablename__ = "esr_country_type"
    country_code: str = Column(String, primary_key=True)
    region_id: str = Column(String, ForeignKey(ESRRegionType.region_id), nullable=False)
    last_updated: datetime = Column(DateTime, nullable=False)
    country_name: str = Column(String, nullable=False)
    country_description: str = Column(String, nullable=True)
    
class ESRUnitsType(Base):
    __tablename__ = "esr_units_type"
    unit_id: str = Column(String, primary_key=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    unit_name: str = Column(String, nullable=False)
    
class ESRCommoditiesType(Base):
    __tablename__ = "esr_commodities_type"
    commodity_code: str = Column(String, primary_key=True)
    unit_id: str = Column(String, ForeignKey(ESRUnitsType.unit_id), nullable=False)
    last_updated: datetime = Column(DateTime, nullable=False)
    commodity_name: str = Column(String, nullable=False)
    
class ESRDataReleaseType(Base):
    __tablename__ = "esr_data_release_type"
    uuid: str = Column(String, primary_key=True)
    last_updated: datetime = Column(DateTime, nullable=False)
    commodity_code: str = Column(String, ForeignKey(ESRCommoditiesType.commodity_code), nullable=False)
    market_year: int = Column(Integer, nullable=False)
    market_year_start: datetime = Column(DateTime, nullable=False)
    market_year_end: datetime = Column(DateTime, nullable=False)
    release_time_stamp: datetime = Column(DateTime, nullable=False)
    
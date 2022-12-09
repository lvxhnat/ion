from sqlalchemy import (
    Column,
    Numeric,
    String,
)

from ion_clients.services.postgres.schemas.base import Base


class USTreasuryYield(Base):
    __tablename__ = "us_treasury_yield"

    uuid: str = Column(String, primary_key=True)
    _date: str = Column(String, nullable=True)
    _1_mo: float = Column(Numeric(4, 2), nullable=True)
    _2_mo: float = Column(Numeric(4, 2), nullable=True)
    _3_mo: float = Column(Numeric(4, 2), nullable=True)
    _4_mo: float = Column(Numeric(4, 2), nullable=True)
    _6_mo: float = Column(Numeric(4, 2), nullable=True)
    _1_yr: float = Column(Numeric(4, 2), nullable=True)
    _2_yr: float = Column(Numeric(4, 2), nullable=True)
    _3_yr: float = Column(Numeric(4, 2), nullable=True)
    _5_yr: float = Column(Numeric(4, 2), nullable=True)
    _7_yr: float = Column(Numeric(4, 2), nullable=True)
    _10_yr: float = Column(Numeric(4, 2), nullable=True)
    _20_yr: float = Column(Numeric(4, 2), nullable=True)
    _30_yr: float = Column(Numeric(4, 2), nullable=True)

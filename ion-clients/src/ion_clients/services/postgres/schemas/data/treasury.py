from datetime import datetime
from sqlalchemy import Column, Numeric, String, DateTime

from ion_clients.services.postgres.schemas.base import Base


class USTreasuryYield(Base):
    __tablename__ = "us_treasury_yield"
    uuid: str = Column(String, primary_key=True)
    _date: datetime = Column(DateTime, nullable=True)
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


class USBillRates(Base):
    __tablename__ = "us_bill_rates"
    uuid: str = Column(String, primary_key=True)
    _date: datetime = Column(DateTime, nullable=True)
    _4_weeks_bank_discount: float = Column(Numeric(4, 2), nullable=True)
    _4_weeks_coupon_equivalent: float = Column(Numeric(4, 2), nullable=True)
    _8_weeks_bank_discount: float = Column(Numeric(4, 2), nullable=True)
    _8_weeks_coupon_equivalent: float = Column(Numeric(4, 2), nullable=True)
    _13_weeks_bank_discount: float = Column(Numeric(4, 2), nullable=True)
    _13_weeks_coupon_equivalent: float = Column(Numeric(4, 2), nullable=True)
    _17_weeks_bank_discount: float = Column(Numeric(4, 2), nullable=True)
    _17_weeks_coupon_equivalent: float = Column(Numeric(4, 2), nullable=True)
    _26_weeks_bank_discount: float = Column(Numeric(4, 2), nullable=True)
    _26_weeks_coupon_equivalent: float = Column(Numeric(4, 2), nullable=True)
    _52_weeks_bank_discount: float = Column(Numeric(4, 2), nullable=True)
    _52_weeks_coupon_equivalent: float = Column(Numeric(4, 2), nullable=True)


class USLongTermRates(Base):
    __tablename__ = "us_longterm_rates"
    uuid: str = Column(String, primary_key=True)
    _date: datetime = Column(DateTime, nullable=True)
    _lt_composite_10_yrs: float = Column(Numeric(4, 2), nullable=True)
    _treasury_20_yr_cmt: float = Column(Numeric(4, 2), nullable=True)


class USRealYieldCurve(Base):
    __tablename__ = "us_real_yield_curve"
    uuid: str = Column(String, primary_key=True)
    _date: datetime = Column(DateTime, nullable=True)
    _5_yr: float = Column(Numeric(4, 2), nullable=True)
    _7_yr: float = Column(Numeric(4, 2), nullable=True)
    _10_yr: float = Column(Numeric(4, 2), nullable=True)
    _20_yr: float = Column(Numeric(4, 2), nullable=True)
    _30_yr: float = Column(Numeric(4, 2), nullable=True)


class USRealLongTerm(Base):
    __tablename__ = "us_real_longterm"
    uuid: str = Column(String, primary_key=True)
    _date: datetime = Column(DateTime, nullable=True)
    _lt_real_average_10_yrs: float = Column(Numeric(4, 2), nullable=True)


if __name__ == "__main__":
    print(type(USRealLongTerm.__tablename__))

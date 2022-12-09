from typing import List, Literal, Union
from pydantic import BaseModel

TreasuryYears = Literal[
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
]

TreasuryTypes = Literal[
    "YIELD_CURVE",
    "BILL_RATES",
    "LONG_TERM_RATE",
    "REAL_YIELD_CURVE",
    "REAL_LONG_TERM",
]


class YieldCurveObject(BaseModel):
    _date: str
    _1_mo: float
    _2_mo: float
    _3_mo: float
    _4_mo: float
    _6_mo: float
    _1_yr: float
    _2_yr: float
    _3_yr: float
    _5_yr: float
    _7_yr: float
    _10_yr: float
    _20_yr: float
    _30_yr: float


class BillRatesObject(BaseModel):
    _date: str
    _4_weeks_bank_discount: float
    _4_weeks_coupon_equivalent: float
    _8_weeks_bank_discount: float
    _8_weeks_coupon_equivalent: float
    _13_weeks_bank_discount: float
    _13_weeks_coupon_equivalent: float
    _17_weeks_bank_discount: float
    _17_weeks_coupon_equivalent: float
    _26_weeks_bank_discount: float
    _26_weeks_coupon_equivalent: float
    _52_weeks_bank_discount: float
    _52_weeks_coupon_equivalent: float


class LongTermRatesObject(BaseModel):
    _date: str
    _lt_composite_10_yrs: float
    _treasury_20_yr_cmt: float


class RealYieldCurveObject(BaseModel):
    _date: str
    _5_yr: float
    _7_yr: float
    _10_yr: float
    _20_yr: float
    _30_yr: float


class RealLongTermObject(BaseModel):
    _date: str
    _lt_real_average_10_yrs: float


YieldCurveDTO = List[YieldCurveObject]
BillRatesDTO = List[BillRatesObject]
LongTermRatesDTO = List[LongTermRatesObject]
RealYieldCurveDTO = List[RealYieldCurveObject]
RealLongTermDTO = List[RealLongTermObject]

TreasuryInfoDTO = Union[
    YieldCurveDTO,
    BillRatesDTO,
    LongTermRatesDTO,
    RealYieldCurveDTO,
    RealLongTermDTO,
]

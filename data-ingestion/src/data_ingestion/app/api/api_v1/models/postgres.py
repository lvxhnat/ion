from typing import Literal
from pydantic import BaseModel
from ion_clients.services.postgres.schemas.treasury import (
    USBillRates,
    USRealLongTerm,
    USLongTermRates,
    USRealYieldCurve,
    USTreasuryYield,
)


class TableQueryParams(BaseModel):
    table: str


tables = {
    USBillRates.__tablename__: USBillRates,
    USRealLongTerm.__tablename__: USRealLongTerm,
    USLongTermRates.__tablename__: USLongTermRates,
    USRealYieldCurve.__tablename__: USRealYieldCurve,
    USTreasuryYield.__tablename__: USTreasuryYield,
}

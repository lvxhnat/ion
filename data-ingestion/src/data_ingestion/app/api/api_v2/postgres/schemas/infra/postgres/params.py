from pydantic import BaseModel

from data_ingestion.app.api.api_v2.postgres.models.data import (
    treasury,
    area_latlon,
)

tables = {
    treasury.USBillRates.__tablename__: treasury.USBillRates,
    treasury.USRealLongTerm.__tablename__: treasury.USRealLongTerm,
    treasury.USLongTermRates.__tablename__: treasury.USLongTermRates,
    treasury.USRealYieldCurve.__tablename__: treasury.USRealYieldCurve,
    treasury.USTreasuryYield.__tablename__: treasury.USTreasuryYield,
    area_latlon.AreaLatLon.__tablename__: area_latlon.AreaLatLon,
}


class TableQueryParams(BaseModel):
    table: str


class AssetSearchParams(TableQueryParams):
    query: str

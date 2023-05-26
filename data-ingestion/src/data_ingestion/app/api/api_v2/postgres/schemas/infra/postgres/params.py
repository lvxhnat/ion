from typing import Union
from ion_clients.services.postgres.models.data.government import treasury
from pydantic import BaseModel

from ion_clients.services.postgres.models.data.common import (
    area_latlon,
)
from data_ingestion.app.api.api_v2.postgres.schemas.infra.portfolio.params import (
    PortfolioAssetParams,
    PortfolioParams,
)

tables = {
    treasury.USBillRates.__tablename__: treasury.USBillRates,
    treasury.USRealLongTerm.__tablename__: treasury.USRealLongTerm,
    treasury.USLongTermRates.__tablename__: treasury.USLongTermRates,
    treasury.USRealYieldCurve.__tablename__: treasury.USRealYieldCurve,
    treasury.USTreasuryYield.__tablename__: treasury.USTreasuryYield,
    area_latlon.AreaLatLon.__tablename__: area_latlon.AreaLatLon,
}

PostgresTable = Union[PortfolioParams, PortfolioAssetParams]


class TableQueryParams(BaseModel):
    table: str


class PortfolioSearchParams(BaseModel):
    id: str


class TickerQueryParams(BaseModel):
    symbol: str
    asset_class: str


class AssetSearchParams(TableQueryParams):
    query: str

from ion_clients.services.postgres.models.data.government import treasury
from ion_clients.services.postgres.models.data.trading import tickers
from pydantic import BaseSettings

from ion_clients.services.postgres.models.data.common import (
    area_latlon,
)
from ion_clients.services.postgres.models.infra import portfolio, watchlist


class BaseAPIConfigs(BaseSettings):
    APP_NAME: str = "data_ingestion"
    API_VERSION_STRING: str = "/v2"

    POSTGRES_TABLES = {
        treasury.USBillRates.__tablename__: treasury.USBillRates,
        treasury.USRealLongTerm.__tablename__: treasury.USRealLongTerm,
        treasury.USLongTermRates.__tablename__: treasury.USLongTermRates,
        treasury.USRealYieldCurve.__tablename__: treasury.USRealYieldCurve,
        treasury.USTreasuryYield.__tablename__: treasury.USTreasuryYield,
        area_latlon.AreaLatLon.__tablename__: area_latlon.AreaLatLon,
        portfolio.Portfolio.__tablename__: portfolio.Portfolio,
        portfolio.PortfolioAssets.__tablename__: portfolio.PortfolioAssets,
        tickers.AssetMetaData.__tablename__: tickers.AssetMetaData,
        watchlist.Watchlist.__tablename__: watchlist.Watchlist,
    }


configs: BaseAPIConfigs = BaseAPIConfigs()

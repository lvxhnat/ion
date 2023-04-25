from pydantic import BaseSettings

from data_ingestion.app.api.api_v2.postgres.models.data import (
    treasury,
    area_latlon,
)


class BaseAPIConfigs(BaseSettings):
    APP_NAME: str = "data_ingestion"
    API_VERSION_STRING: str = "/api/v2"

    POSTGRES_TABLES = {
        treasury.USBillRates.__tablename__: treasury.USBillRates,
        treasury.USRealLongTerm.__tablename__: treasury.USRealLongTerm,
        treasury.USLongTermRates.__tablename__: treasury.USLongTermRates,
        treasury.USRealYieldCurve.__tablename__: treasury.USRealYieldCurve,
        treasury.USTreasuryYield.__tablename__: treasury.USTreasuryYield,
        area_latlon.AreaLatLon.__tablename__: area_latlon.AreaLatLon,
    }


configs: BaseAPIConfigs = BaseAPIConfigs()

from pydantic import BaseSettings


class BaseAPIConfigs(BaseSettings):
    APP_NAME: str = "data_ingestion"
    API_VERSION_STRING: str = "/api/v2"

configs: BaseAPIConfigs = BaseAPIConfigs()

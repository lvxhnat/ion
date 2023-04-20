from pydantic import BaseSettings

class BaseApplicationConfigs(BaseSettings):
    APP_NAME: str = "data_ingestion"


config: BaseApplicationConfigs = BaseApplicationConfigs()

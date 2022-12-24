from pydantic import BaseSettings, Field
from pathlib import Path


class IngestionSettings(BaseSettings):

    OANDA_LIVE_API_KEY: str = Field(..., env="OANDA_LIVE_API_KEY")
    OANDA_ACCOUNT_ID: str = Field(..., env="OANDA_ACCOUNT_ID")
    FINNHUB_API_KEY: str = Field(..., env="FINNHUB_API_KEY")
    OPENWEATHER_API_KEY: str = Field(..., env="OPENWEATHER_API_KEY")

    class Config:
        env_file = (
            Path(__file__).resolve().parent.parent.parent.parent
            / ".env.credentials"
        )
        env_file_encoding = "utf-8"


ingestion_settings = IngestionSettings()

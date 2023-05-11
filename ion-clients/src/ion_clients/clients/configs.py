from typing import List
from pathlib import Path
from pydantic import BaseSettings, Field


class IngestionSettings(BaseSettings):

    OANDA_LIVE_API_KEY: str = Field(..., env="OANDA_LIVE_API_KEY")
    OANDA_ACCOUNT_ID: str = Field(..., env="OANDA_ACCOUNT_ID")
    FINNHUB_API_KEY: str = Field(..., env="FINNHUB_API_KEY")
    OPENWEATHER_API_KEY: str = Field(..., env="OPENWEATHER_API_KEY")

    NEWS_API_KEY: str = Field(..., env="NEWS_APIKEY_0")

    class Config:
        env_file = Path(__file__).resolve().parents[3] / ".env.credentials"
        env_file_encoding = "utf-8"


ingestion_settings = IngestionSettings()

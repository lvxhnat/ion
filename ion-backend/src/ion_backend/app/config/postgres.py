from pydantic import Field
from dotenv import load_dotenv
from pydantic_settings import BaseSettings


class PostgresConfig(BaseSettings, extra="allow"):

    load_dotenv()

    POSTGRES_URI: str = Field(..., env="POSTGRES_URI")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


postgres_config = PostgresConfig()

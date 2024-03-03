from enum import Enum
from dotenv import load_dotenv

from pydantic import Field
from pydantic_settings import BaseSettings
from ion_backend.app.services.postgres.models import (
    Users,
    UserPortfolios,
    PortfolioTransactions,
)


class PostgresTables(Enum):
    Users.__tablename__: Users
    UserPortfolios.__tablename__: UserPortfolios
    PortfolioTransactions.__tablename__: PortfolioTransactions


class PostgresConfig(BaseSettings):

    load_dotenv()

    POSTGRES_URI: str = Field(..., env="POSTGRES_URI")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


postgres_config = PostgresConfig()

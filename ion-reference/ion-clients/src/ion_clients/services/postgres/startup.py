import inspect

from ion_clients.services.postgres.models.base import Base

from ion_clients.services.postgres import models
from ion_clients.services.postgres.models.data import (
    AreaLatLon,
    AssetMetaData,
    EquityMetaData,
    ETFHoldings,
    ETFMetaData,
    USBillRates,
    USLongTermRates,
    USRealLongTerm,
    USRealYieldCurve,
    USTreasuryYield,
    FredMetaData,
)
from ion_clients.services.postgres.models.infra import (
    Portfolio,
    PortfolioCashflow,
    PortfolioTransactions,
    Watchlist,
)
from ion_clients.services.postgres.actions import create_table
from ion_clients.services.logging import get_logger

infra_sequence = [Portfolio, PortfolioCashflow, PortfolioTransactions, Watchlist]
common_sequence = [AreaLatLon]
tickers_sequence = [AssetMetaData, EquityMetaData, ETFMetaData, ETFHoldings]
treasury_sequence = [
    USBillRates,
    USLongTermRates,
    USRealLongTerm,
    USRealYieldCurve,
    USTreasuryYield,
]
government_sequence = [FredMetaData]

logger = get_logger(__name__)


def initialise_raw_tables():
    postgres_tables = []
    for _, submodule in inspect.getmembers(models):
        for _, cls in inspect.getmembers(
            submodule, lambda member: inspect.isclass(member)
        ):
            if issubclass(cls, Base) and hasattr(cls, "__table__"):
                postgres_tables.append(cls)

    data_tables = (
        tickers_sequence
        + treasury_sequence
        + common_sequence
        + government_sequence
    )
    infra_tables = infra_sequence

    tables = infra_tables + data_tables

    if len(postgres_tables) != len(tables):
        logger.warning(
            f"Number of tables mismatched. {len(postgres_tables)} exist but only {len(tables)} tables creation declared."
        )
    for table in tables:
        create_table(table)
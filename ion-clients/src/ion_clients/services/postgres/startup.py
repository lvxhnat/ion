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
)
from ion_clients.services.postgres.models.infra import (
    Portfolio,
    PortfolioAssets,
)
from ion_clients.services.postgres.actions import create_table

portfolio_sequence = [Portfolio, PortfolioAssets]
common_sequence = [AreaLatLon]
tickers_sequence = [AssetMetaData, ETFMetaData, EquityMetaData, ETFHoldings]
treasury_sequence = [
    USBillRates,
    USLongTermRates,
    USRealLongTerm,
    USRealYieldCurve,
    USTreasuryYield,
]


def initialise_raw_tables():
    postgres_tables = []
    for _, submodule in inspect.getmembers(models):
        for _, cls in inspect.getmembers(
            submodule, lambda member: inspect.isclass(member)
        ):
            if issubclass(cls, Base) and hasattr(cls, "__table__"):
                postgres_tables.append(cls)

    data_tables = tickers_sequence + treasury_sequence + common_sequence
    infra_tables = portfolio_sequence

    tables = infra_tables + data_tables

    if len(postgres_tables) != len(tables):
        raise Exception(
            f"Number of tables mismatched. {len(postgres_tables)} exist but only {len(tables)} tables creation declared."
        )
    for table in tables:
        create_table(table)

from finflow_algos.logging import get_logger
from finflow_algos.services.postgres.base import create_table
from finflow_algos.services.postgres.tables import (
    Portfolio, PortfolioTransactions
)

logger = get_logger(__name__)

def initialise_raw_tables() -> None:
    
    tables = [Portfolio, PortfolioTransactions]
    for table in tables:
        create_table(table)

if __name__ == '__main__':
    initialise_raw_tables()
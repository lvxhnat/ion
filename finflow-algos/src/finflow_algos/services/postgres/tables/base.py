from enum import Enum

class PostgresTables(Enum):
    GLOBAL_AREA_LATLON = "global_area_latlon"
    PORTFOLIO = "portfolio"
    PORTFOLIO_TRANSACTIONS = "portfolio_transactions"
    
POSTGRES_TABLES = PostgresTables()



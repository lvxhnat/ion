from pydantic import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "data_ingestion"
    API_V1_STR: str = "/api/v1"
    
    MONGODB_ASSET_INFO_TABLE: str = "asset-infos"
    MONGODB_FUNCTIONS_COLLECTION: str = "main_functions"
    MONGODB_FUNCTIONS_COLLECTION_QUERY_FIELD: str = "name" 
    
    MONGODB_ETFS_COLLECTION: str = "etf_infos"
    MONGODB_ETFS_COLLECTION_QUERY_FIELD: str = "ticker"
    
    MONGODB_TICK_INFO_TABLE: str = "tickers"
    MONGODB_TICK_COLLECTION: str = "ticker_infos"
    MONGODB_TICK_COLLECTION_QUERY_TICK: str = "symbol"
    MONGODB_TICK_COLLECTION_QUERY_TYPE: str = "quote_type"
    
settings = Settings()
from pydantic import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    
    MONGODB_ASSET_INFO_TABLE: str = "asset-infos"
    MONGODB_FUNCTIONS_COLLECTION: str = "main_functions"
    MONGODB_FUNCTIONS_COLLECTION_QUERY_FIELD: str = "name" 
    
settings = Settings()
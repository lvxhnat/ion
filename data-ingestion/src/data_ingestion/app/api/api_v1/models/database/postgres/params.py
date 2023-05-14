from pydantic import BaseModel


class TableQueryParams(BaseModel):
    table: str


class AssetSearchParams(TableQueryParams):
    query: str
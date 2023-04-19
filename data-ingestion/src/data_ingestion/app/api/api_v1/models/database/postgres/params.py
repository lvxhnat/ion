from pydantic import BaseModel


class TableQueryParams(BaseModel):
    table: str

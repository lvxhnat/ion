from pydantic import BaseModel
from typing import Optional, Union


class UserUploadQuery(BaseModel):
    user_id: str


class UserTableQuery(BaseModel):
    table_id: Union[str, int]
    page: Optional[int] = 1
    pagesize: Optional[int] = 50

import pandas as pd
from pydantic import BaseModel
from typing import List, Union

from sqlalchemy import Table
from sqlalchemy.orm import Session

WriteObjectType = Union[List[dict], List[Table], pd.DataFrame]


class BulkEditParams(BaseModel):
    session: Session
    table_schema: Table
    write_objects: WriteObjectType

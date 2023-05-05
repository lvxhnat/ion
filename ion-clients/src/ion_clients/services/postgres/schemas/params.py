import pandas as pd
from sqlalchemy import Table
from typing import List, Union

WriteObjectType = Union[List[dict], List[Table], pd.DataFrame] # List[sqlalchemy.Table]
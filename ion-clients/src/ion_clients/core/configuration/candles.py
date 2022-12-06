from pydantic import BaseModel
from typing import Any, Literal, Optional


class BaseResponse(BaseModel):
    data: Any
    response_code: Literal[200]
    error_message: str


class BaseCandlesResponseModel(BaseResponse):

    pass

class BaseCandlesDataModel(BaseModel):
    date: str
    vol: int
    open: Optional[float]
    high: Optional[float]
    close: Optional[float]
    low: Optional[float]
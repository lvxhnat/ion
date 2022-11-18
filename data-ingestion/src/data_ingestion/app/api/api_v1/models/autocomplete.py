from pydantic import BaseModel


class SecurityFunctions(BaseModel):
    query: str

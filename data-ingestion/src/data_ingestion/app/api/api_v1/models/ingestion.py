from pydantic import BaseModel


class UserUploadQuery(BaseModel):
    user_id: str
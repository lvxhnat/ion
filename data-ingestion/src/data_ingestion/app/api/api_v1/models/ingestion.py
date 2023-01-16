from pydantic import BaseModel


class UserUploadQuery(BaseModel):
    user_id: str
    
class UserUploadFile(BaseModel):
    file_id: str
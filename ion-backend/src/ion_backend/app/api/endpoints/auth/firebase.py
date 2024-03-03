from fastapi import APIRouter, Depends
from ion_backend.app.common.auth.firebase import get_user_token

router = APIRouter()


@router.post("/auth")
def user_logged_in(user=Depends(get_user_token)):
    return user

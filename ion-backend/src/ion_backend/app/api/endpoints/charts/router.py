from fastapi import APIRouter, Depends

router = APIRouter()

@router.post("/auth")
def get_health(user = Depends()): pass 
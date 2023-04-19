from fastapi import APIRouter

router = APIRouter(
    prefix="tickers",
    tags=["tickers"],
)

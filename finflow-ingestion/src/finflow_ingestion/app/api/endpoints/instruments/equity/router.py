from fastapi import APIRouter
from datetime import datetime, timedelta

from finflow_ingestion.app.api.endpoints.instruments.equity.params import HistoricalEquityParams
from finflow_ingestion.app.api.endpoints.instruments.equity.finhub.instruments import get_finnhub_historical_data

router = APIRouter()

@router.post("/historical")
def get_historical(
    params: HistoricalEquityParams,
):
    if not params.from_date:
        from_date = (datetime.today() - timedelta(days=365))
        from_date = from_date.strftime("%Y-%m-%d")
    else:
        from_date = params.from_date
    return get_finnhub_historical_data(ticker=params.symbol, from_date=from_date)
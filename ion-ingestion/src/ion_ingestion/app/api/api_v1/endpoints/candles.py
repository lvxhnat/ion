from dotenv import load_dotenv

from fastapi import APIRouter
from ion_clients.clients.oanda import instruments as oanda_instruments
from ion_ingestion.app.models.candles import LiveCandles

load_dotenv()

router = APIRouter()


@router.post("/oanda/candlesHistorical")
def get_oanda_historical_candles(params: LiveCandles):
    return oanda_instruments.historical(params.symbol, params.period)

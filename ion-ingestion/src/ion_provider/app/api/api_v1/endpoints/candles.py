from dotenv import load_dotenv

from fastapi import APIRouter
from ion_provider.app.models.candles import LiveCandles
from ion.clients.oanda.instruments import get_oanda_live_data

load_dotenv()

router = APIRouter()


@router.post("/oanda/candlesLive")
def get_oanda_live_candles(params: LiveCandles):
    return get_oanda_live_data(
        symbol=params.symbol, granularity=params.granularity
    )

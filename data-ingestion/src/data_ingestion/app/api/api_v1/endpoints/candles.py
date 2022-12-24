from dotenv import load_dotenv

from fastapi import APIRouter

from ion_clients.clients.oanda import instruments as oanda_instruments
from ion_clients.clients.finhub import instruments as finnhub_instruments

from data_ingestion.app.api.api_v1.models.candles import LiveCandles

load_dotenv()

router = APIRouter(
    prefix="/candles",
    tags=["candles"],
)


@router.post("/finnhub/candlesHistorical")
def get_finnhub_historical_candles():
    finnhub_instruments.get_finnhub_tickers_hd()


@router.post("/oanda/candlesHistorical")
def get_oanda_historical_candles(params: LiveCandles):
    return oanda_instruments.historical(params.symbol, params.period)

from dotenv import load_dotenv

from fastapi import APIRouter
from datetime import datetime, timedelta

from ion_clients.clients.oanda import instruments as oanda_instruments
from ion_clients.clients.finhub import instruments as finnhub_instruments

from data_ingestion.app.api.api_v1.models.candles import (
    LiveCandles,
    HistoricalOandaCandles,
    HistoricalFinhubCandles,
)

load_dotenv()

router = APIRouter(
    prefix="/candles",
    tags=["candles"],
)


@router.get("/ping")
def ping():
    try:
        oanda_instruments.historical("EUR_USD", "1M_S")
        return {"status": 200}
    except:
        return {"status": 500}


@router.post("/finnhub/candlesHistorical")
def get_finnhub_historical_candles(params: HistoricalFinhubCandles):
    if not params.from_date:
        from_date = (datetime.today() - timedelta(days=75)).strftime(
            "%Y-%m-%d"
        )
    else:
        from_date = params.from_date
    return finnhub_instruments.get_finnhub_tickers_hd(
        params.tickers, from_date
    )


@router.post("/oanda/candlesHistorical")
def get_oanda_historical_candles(params: LiveCandles):
    return oanda_instruments.historical(params.symbol, params.period)


@router.post("/oanda/unboundedCandlesHistorical")
def get_oanda_unbounded_historical_candles(params: HistoricalOandaCandles):
    """Research endpoint allowing for multithreaded extractions of long time ranges that oanda do not allow"""
    return oanda_instruments.get_oanda_historical_data(
        symbol=params.symbol,
        from_date=params.from_date,
        to_date=params.to_date,
        granularity=params.granularity,
        parallelize=True,
    )

import uvicorn
import inspect
from typing import List

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from data_ingestion.app.api.api_v1.configs.base_config import settings
from data_ingestion.app.api.api_v1 import api

from data_ingestion.app.api.api_v2.postgres.models.base import Base
from data_ingestion.app.api.api_v2.postgres.models.infra import ingestion
from data_ingestion.app.api.api_v2.postgres.actions import initialise_table

from ion_clients.clients.oanda.instruments import stream_oanda_live_data

app = FastAPI(
    title="data-ingestion",
    description="",
    version="0.0.8",
    root_path="/",
    contact={"name": "Yi Kuang", "email": "yikuang5@gmail.com"},
)

origins = [
    "http://localhost:*",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def intiialise_database_infra():
    """Initialise tables in Postgres if does not exist already"""
    for _, cls in inspect.getmembers(
        ingestion, lambda member: inspect.isclass(member)
    ):
        # Check for table attribute excludes the direct parent class
        if issubclass(cls, Base) and hasattr(cls, "__table__"):
            table_initiated: bool = initialise_table(cls)
            if not table_initiated:
                return


@app.get("/ping", include_in_schema=False)
def ping():
    return {"status": "ok"}


@app.websocket("/oanda/ws")
async def stream_oanda_live_prices(websocket: WebSocket):

    await websocket.accept()
    forex_subscriptions: List[str] = [
        "EUR_USD",
        "EUR_AUD",
        "EUR_JPY",
        "EUR_NOK",
        "USD_SGD",
        "USD_THB",
        "USD_CAD",
        "USD_JPY",
    ]

    async def callback(x):
        await websocket.send_json(x)

    await stream_oanda_live_data(forex_subscriptions, callback)


app.include_router(api.api_router, prefix=settings.API_VERSION_STRING)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1236, reload=True)

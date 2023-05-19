import uvicorn
import inspect
from typing import List

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from data_ingestion.app.api.router_generator import api_router

from data_ingestion.app.api.api_v2.postgres.models.base import Base
from data_ingestion.app.api.api_v2.postgres.models.infra import portfolio

from ion_clients.clients.oanda.instruments import stream_oanda_live_data
from ion_clients.services.postgres.postgres_service import create_table


def create_app() -> FastAPI:

    app: FastAPI = FastAPI(
        title="data-ingestion",
        description="",
        version="1.0.0.",
        root_path="/",
        contact={"name": "Yi Kuang", "email": "yikuang5@gmail.com"},
    )
    app.include_router(api_router)

    origins = [
        "http://localhost:*",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://frontend:3000",
        "http://frontend:*",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app: FastAPI = create_app()


@app.on_event("startup")
async def intialise_database_infra():
    """Initialise tables in Postgres if does not exist already"""
    for _, cls in inspect.getmembers(
        portfolio, lambda member: inspect.isclass(member)
    ):
        # Check for table attribute excludes the direct parent class
        if issubclass(cls, Base) and hasattr(cls, "__table__"):
            table_initiated: bool = create_table(cls)
            if not table_initiated:
                return


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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1236, reload=True)

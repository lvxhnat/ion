import uvicorn
from typing import List

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from data_backend.app.api.router import api_router

from ion_clients.clients.oanda.instruments import stream_oanda_live_data
from ion_clients.services.postgres.startup import initialise_raw_tables

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
    initialise_raw_tables()


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

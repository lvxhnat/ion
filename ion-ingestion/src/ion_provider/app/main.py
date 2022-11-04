import uvicorn
from typing import List
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from ion_provider.app.core.config import settings
from ion_provider.app.api.api_v1 import api
from ion.clients.oanda.instruments import (
    stream_oanda_live_data,
)

app = FastAPI(
    title="ion-ingestion",
    description="",
    version="0.0.8",
    root_path="/",
    contact={"name": "Yi Kuang", "email": "yikuang5@gmail.com"},
)

origins = ["http://localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
def home_page():
    response = RedirectResponse(url="/docs")
    return response


@app.websocket("/oanda/ws")
async def stream_oanda_live_prices(websocket: WebSocket):

    await websocket.accept()
    forex_subscriptions: List[str] = [
        "EUR_USD",
        "USD_SGD",
        "USD_INR",
        "USD_JPY",
    ]

    async def callback(x):
        await websocket.send_json(x)

    await stream_oanda_live_data(forex_subscriptions, callback)


app.include_router(api.api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1236, reload=True)

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from data_ingestion.app.core.config import settings
from data_ingestion.app.api.api_v1 import api

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


@app.get("/", include_in_schema=False)
def home_page():
    response = RedirectResponse(url="/docs")
    return response

app.include_router(api.api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1236, reload=True)

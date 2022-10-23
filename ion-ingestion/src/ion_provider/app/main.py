import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from ion_provider.app.core.config import settings
from ion_provider.app.api.api_v1 import api

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


app.include_router(api.api_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1236, reload=True)

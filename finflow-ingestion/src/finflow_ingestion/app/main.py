import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1236, reload=True)

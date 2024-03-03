import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ion_backend.app.api import api_router


def create_app() -> FastAPI:

    app: FastAPI = FastAPI(
        title="backend",
        description="",
        version="1.0.0.",
        contact={"name": "Yi Kuang", "email": "yikuang5@gmail.com"},
    )

    origins = [
        "http://localhost:*",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://frontend:3000",
        "http://frontend:*",
    ]

    app.include_router(api_router)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app: FastAPI = create_app()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1237, reload=True)

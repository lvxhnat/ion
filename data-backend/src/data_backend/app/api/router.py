import sys
from types import ModuleType

from fastapi import APIRouter

from data_backend.app.api.endpoints import *


def _get_modules(prefix: str) -> list[ModuleType]:
    return [
        sys.modules[k]
        for k in sys.modules.keys()
        if k.startswith(f"{prefix}.")
    ]


def get_routers() -> APIRouter:
    root = "data_ingestion.app.api.api_v2.endpoints"
    router = APIRouter()
    for m in _get_modules(root):
        file_name = m.__name__.split(f"{root}.", 1)[1]
        try:
            if m.router:
                file_name = "/".join(file_name.split("."))
                router.include_router(m.router, prefix=f"/v2/{file_name}")
        except:
            pass

    return router


api_router: APIRouter = get_routers()

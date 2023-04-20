from kombu import Exchange
from dotenv import load_dotenv
from pydantic import BaseSettings, Field

env_loaded: bool = load_dotenv()
import os
from functools import lru_cache
from kombu import Queue


def route_task(name, args, kwargs, options, task=None, **kw):
    if ":" in name:
        queue, _ = name.split(":")
        return {"queue": queue}
    return {"queue": "celery"}


class BaseCeleryConfig(BaseSettings):
    CELERY_BROKER_URL: str = Field(..., env="CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND: str = Field(..., env="CELERY_RESULT_BACKEND_URL")

    CELERY_TASK_QUEUES = [
        Queue(
            name="ingestion",
            exchange=Exchange("data-ingestion", type="direct"),
        )
    ]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


celery_config = BaseCeleryConfig()


class CeleryConfig(BaseCeleryConfig):
    pass


@lru_cache()
def get_settings():
    config_cls_dict = {
        "development": CeleryConfig,
    }
    config_name = os.environ.get("CELERY_CONFIG", "development")
    config_cls = config_cls_dict[config_name]
    return config_cls()


settings = get_settings()

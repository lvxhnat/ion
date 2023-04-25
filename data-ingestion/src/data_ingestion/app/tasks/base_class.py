from logging import Logger
from typing import Optional

import celery
from celery import Task
from sqlalchemy import orm

from data_ingestion.app.api.api_v2.postgres.postgres_service import (
    postgres_engine,
)

logger: Logger = celery.utils.log.get_task_logger(__name__)


class BaseClassTask(Task):
    _postgres_sessionmaker: Optional[orm.sessionmaker] = None

    @property
    def postgres_sessionmaker(self):
        if self._postgres_sessionmaker is None:
            self._postgres_sessionmaker = orm.sessionmaker(
                bind=postgres_engine, expire_on_commit=False
            )
        return self._postgres_sessionmaker

    def before_start(self, task_id, args, kwargs):
        pass

    def on_success(self, retval, task_id, args, kwargs):
        pass

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        pass

from celery import shared_task

from data_ingestion.app.tasks.base_class import BaseClassTask


@shared_task(
    bind=True,
    name="weather:get_weather_task",
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={"max_retries": 5},
    base=BaseClassTask,
)
def get_weather_task(self):
    pass

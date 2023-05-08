import pandas as pd
import numpy as np
from uuid import uuid4
from typing import List

from prefect import task, flow
from prefect.task_runners import ConcurrentTaskRunner

from ion_provider.flows.shared import refresh_table
from ion_provider.models.common.area_latlon import AreaLatLon
from ion_clients.clients.common.area_latlon import geonames_info


@task
def ingest_geonames() -> pd.DataFrame:

    return (
        geonames_info()
        .drop_duplicates()[
            [col.name for col in AreaLatLon.__table__.columns if col.name != "uuid"]
        ]
        .dropna()
    )


@task
def typecast_geonames(data: pd.DataFrame) -> List[dict]:
    # typecast
    data.latitude = data.latitude.astype(np.float32)
    data.longitude = data.longitude.astype(np.float32)
    data.population = data.population.astype(np.int32)
    data.dem = data.dem.astype(np.int16)
    data["uuid"] = [str(uuid4()) for _ in range(len(data))]
    return data.to_dict("records")


@flow(
    task_runner=ConcurrentTaskRunner(),
    name="Geonames Scraper Flow",
    description="Scheduled prefect pipeline for extracting city to longitude:latitude information.",
)
def geonames_ingestion_flow():
    geonames = ingest_geonames.submit().result()
    geonames = typecast_geonames.submit(geonames).result()
    refresh_table.submit(AreaLatLon, geonames, True).result()


if __name__ == "__main__":
    geonames_ingestion_flow()

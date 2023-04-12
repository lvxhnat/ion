import hydra
from omegaconf import DictConfig, OmegaConf
from prefect.deployments import Deployment
from prefect.orion.schemas.schedules import CronSchedule

from data_engine.flows.treasury.usgov import treasury_ingestion_flow
from data_engine.flows.common.area_latlon import geonames_ingestion_flow
from data_engine.flows.tickers.tickers import asset_ingestion_flow

config_file_path = "./src/data_engine/request_configs/"


@hydra.main(
    version_base=None,
    config_path=config_file_path,
    config_name="treasury-configs",
)
def execute_us_treasury_deployment(config: DictConfig):
    Deployment.build_from_flow(
        flow=treasury_ingestion_flow,
        name="Ingest US Treasury Data",
        version="1",
        tags=["common"],
        parameters={
            "years": OmegaConf.to_object(
                config.scrapers.usgov.treasury_info.year
            ),
            "types": OmegaConf.to_object(
                config.scrapers.usgov.treasury_info.type
            ),
        },
        schedule=(
            CronSchedule(
                cron=config.scrapers.usgov.treasury_info.schedule.cron,
                timezone=config.scrapers.usgov.treasury_info.schedule.timezone,
            )
        ),
        work_queue_name="treasury",
    ).apply()


@hydra.main(
    version_base=None,
    config_path=config_file_path,
    config_name="common-configs",
)
def execute_geonames_deployment(config: DictConfig):
    Deployment.build_from_flow(
        flow=geonames_ingestion_flow,
        name="Ingest Geonames City-Lat:Lon Data",
        version="1",
        tags=["common"],
        parameters={},
        schedule=(
            CronSchedule(
                cron=config.scrapers.common.geonames.schedule.cron,
                timezone=config.scrapers.common.geonames.schedule.timezone,
            )
        ),
        work_queue_name="common",
    ).apply()


@hydra.main(
    version_base=None,
    config_path=config_file_path,
    config_name="common-configs",
)
def execute_asset_deployment(config: DictConfig):
    Deployment.build_from_flow(
        flow=asset_ingestion_flow,
        name="Ingest Asset Data",
        version="1",
        tags=["common"],
        parameters={},
        schedule=(
            CronSchedule(
                cron=config.scrapers.common.assets.schedule.cron,
                timezone=config.scrapers.common.assets.schedule.timezone,
            )
        ),
        work_queue_name="common",
    ).apply()


if __name__ == "__main__":
    execute_us_treasury_deployment()
    execute_geonames_deployment()
    execute_asset_deployment()

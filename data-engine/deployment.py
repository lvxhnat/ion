from prefect.deployments import Deployment
from prefect.orion.schemas.schedules import CronSchedule

from task_flows.usgov.treasury import treasury_ingestion_flow

from configs.config_loader import request_cfgs

deployment_treasury = Deployment.build_from_flow(
    flow=treasury_ingestion_flow,
    name="Ingest US Treasury Data",
    parameters={
        "years": request_cfgs["usgov"]["treasury_info"]["year"],
        "types": request_cfgs["usgov"]["treasury_info"]["type"],
    },
    schedule=(
        CronSchedule(
            cron=request_cfgs["usgov"]["treasury_info"]["schedule"]["cron"],
            timezone=request_cfgs["usgov"]["treasury_info"]["schedule"][
                "timezone"
            ],
        )
    ),
)
if __name__ == '__main__':
    deployment_treasury.apply()

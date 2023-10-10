import yaml
from pathlib import Path

from ion_provider.flows.treasury.usgov import treasury_ingestion_flow
from ion_provider.flows.tickers.tickers import asset_ingestion_flow
from ion_provider.flows.common.area_latlon import geonames_ingestion_flow

ROOT_PATH: Path = Path(__file__).parents[1] / "configs" / "flows"

COMMON_CONFIGS: str = str(ROOT_PATH / "common-configs.yaml")
TREASURY_CONFIGS: str = str(ROOT_PATH / "treasury-configs.yaml")


def read_yaml_configs(path: str):
    with open(path, "r") as stream:
        try:
            yaml_configs: dict = yaml.safe_load(stream)
            return yaml_configs["scrapers"]
        except yaml.YAMLError as exc:
            print(exc)


if __name__ == "__main__":
    treasury_configs: dict = read_yaml_configs(TREASURY_CONFIGS)
    common_configs: dict = read_yaml_configs(COMMON_CONFIGS)
    ti_params: dict = treasury_configs["usgov"]["treasury_info"]["params"] # Treasury Info Params
    
    treasury_ingestion_flow(ti_params['year'], ti_params['type'])
    asset_ingestion_flow() 
    geonames_ingestion_flow()
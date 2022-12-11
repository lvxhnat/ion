import io
from pathlib import Path
from typing import Union
from configs.yaml import YamlConfigurationMechanism
from configs.common import ConfigurationError


def load_config_file(
    config_file: Union[Path, str],
):
    if isinstance(config_file, str):
        config_file = Path(config_file)

    if not config_file.is_file():
        raise ConfigurationError(f"Cannot open config file {config_file}")

    config_mech = YamlConfigurationMechanism()

    raw_config_file = config_file.read_text()
    config_fp = io.StringIO(raw_config_file)
    return config_mech.load_config(config_fp)


request_cfgs = load_config_file(
    "/Users/lohyikuang/Downloads/personal_projects/ion/data-engine/request-configs.yaml"
)["scrapers"]

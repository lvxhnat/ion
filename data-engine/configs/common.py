from abc import ABC, abstractmethod
from typing import IO


class ConfigurationMechanism(ABC):
    @abstractmethod
    def load_config(self, config_fp: IO) -> dict:
        pass

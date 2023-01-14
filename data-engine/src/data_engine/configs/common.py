from abc import ABC, abstractmethod
from typing import IO


class ConfigurationMechanism(ABC):
    @abstractmethod
    def load_config(self, config_fp: IO) -> dict:
        pass


class DataError(Exception):
    """A base class for all meta exceptions"""


class ConfigurationError(DataError):
    """A configuration error has happened"""


class PipelineExecutionError(DataError):
    """An error occurred when executing the pipeline"""

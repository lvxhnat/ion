class DataError(Exception):
    """A base class for all meta exceptions"""


class ConfigurationError(DataError):
    """A configuration error has happened"""


class PipelineExecutionError(DataError):
    """An error occurred when executing the pipeline"""

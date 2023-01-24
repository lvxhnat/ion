import logging
from typing import Literal

logger_mapping = {
    "CRITICAL": logging.CRITICAL,
    "ERROR": logging.ERROR,
    "WARNING": logging.WARNING,
    "INFO": logging.INFO,
    "DEBUG": logging.DEBUG,
}


def get_logger(
    log_level: Literal[
        "CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"
    ] = "DEBUG"
):

    root_logger = logging.getLogger()
    formatter = logging.Formatter(
        fmt="[%(levelname)s %(asctime)s] %(filename)s - %(funcName)s(): %(message)s",
        datefmt="%m/%d/%Y %I:%M:%S %p",
    )

    for handler in root_logger.handlers:
        if isinstance(handler, logging.StreamHandler):
            handler.setFormatter(formatter)

    root_logger.setLevel(logger_mapping[log_level])
    root_logger.propagate = False

    return root_logger

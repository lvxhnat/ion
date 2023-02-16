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
    ] = "INFO"
):

    logger = logging.getLogger()
    logger.setLevel(logger_mapping[log_level])
        
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter(
        fmt="[%(levelname)s %(asctime)s] %(filename)s - %(funcName)s(): %(message)s",
        datefmt="%m/%d/%Y %I:%M:%S %p",
    )
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)    

    return logger

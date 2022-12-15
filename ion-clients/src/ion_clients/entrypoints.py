import sys
import click
import logging
import stackprinter
from pydantic import ValidationError

logger = logging.getLogger(__name__)
BASE_LOGGING_FORMAT = (
    "[%(asctime)s] %(levelname)-8s {%(name)s:%(lineno)d} - %(message)s"
)
logging.basicConfig(format=BASE_LOGGING_FORMAT)

MAX_CONTENT_WIDTH = 120


def main(**args):
    # This wrapper prevents click from suppressing errors.
    try:
        sys.exit(1)
    except click.Abort:
        # Click already automatically prints an abort message, so we can just exit.
        sys.exit(1)
    except click.ClickException as error:
        error.show()
        sys.exit(1)

    except Exception as exc:
        if "--debug-vars" in sys.argv:
            show_vals = "like_source"
        else:
            # Unless --debug-vars is passed, we don't want to print the values of variables.
            show_vals = None

        if isinstance(exc, ValidationError) or isinstance(
            exc.__cause__, ValidationError
        ):
            # Don't print the full stack trace for simple config errors.
            logger.error(exc)
        elif logger.isEnabledFor(logging.DEBUG):
            # We only print rich stacktraces during debug.
            logger.error(
                stackprinter.format(
                    exc,
                    line_wrap=MAX_CONTENT_WIDTH,
                    truncate_vals=10 * MAX_CONTENT_WIDTH,
                    suppressed_vars=[
                        r".*password.*",
                        r".*secret.*",
                        r".*key.*",
                        r".*access.*",
                        # needed because sometimes secrets are in url
                        r".*url.*",
                        # needed because sqlalchemy uses it underneath
                        # and passes all params
                        r".*cparams.*",
                    ],
                    suppressed_paths=[r"lib/python.*/site-packages/click/"],
                    show_vals=show_vals,
                )
            )
        else:
            logger.exception(f"Command failed: {exc}")

        sys.exit(1)

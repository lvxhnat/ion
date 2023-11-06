import logging
import functools

logger = logging.getLogger(__name__)


def retry(retries):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(retries):
                try:
                    return func(*args, **kwargs)
                except:
                    pass
            logging.warning(f"Error in {func.__name__}. Max retries exceeded.")
            raise ValueError

        return wrapper

    return decorator

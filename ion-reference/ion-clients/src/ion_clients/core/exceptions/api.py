class RateLimitException(Exception):
    def __str__(self):
        return "API call frequency limit hit."

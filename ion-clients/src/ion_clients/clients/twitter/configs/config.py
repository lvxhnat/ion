import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(
    Path(__file__).parent.parent.parent.parent.parent.parent
    / ".env.credentials"
)
n = 10
TWITTER_CONSUMER_KEYS = [
    os.environ[f"TWITTER_CONSUMER_KEY_{i+2}"] for i in range(n)
]
TWITTER_CONSUMER_SECRETS = [
    os.environ[f"TWITTER_CONSUMER_SECRET_{i+2}"] for i in range(n)
]
TWITTER_ACCESS_TOKENS = [
    os.environ[f"TWITTER_ACCESS_TOKEN_{i+2}"] for i in range(n)
]
TWITTER_ACCESS_TOKEN_SECRETS = [
    os.environ[f"TWITTER_SECRET_ACCESS_TOKEN_{i+2}"] for i in range(n)
]

TWITTER_KEYS = [
    dict(
        zip(
            [
                "consumer_key",
                "consumer_secret",
                "access_token",
                "access_token_secret",
            ],
            keyset,
        )
    )
    for keyset in zip(
        TWITTER_CONSUMER_KEYS,
        TWITTER_CONSUMER_SECRETS,
        TWITTER_ACCESS_TOKENS,
        TWITTER_ACCESS_TOKEN_SECRETS,
    )
]

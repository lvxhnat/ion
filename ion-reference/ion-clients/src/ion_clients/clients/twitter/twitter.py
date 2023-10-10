from __future__ import annotations

import concurrent.futures
import math
import queue
import time
from collections import deque
from collections.abc import Iterable
from typing import List, Optional

import numpy as np
import pandas as pd
import tweepy
from tweepy.errors import Unauthorized, TooManyRequests, TweepyException
from more_itertools import chunked
from pandas.api.types import is_string_dtype
from ion_clients.services.logging import get_logger
from ion_clients.clients.twitter.configs.config import TWITTER_KEYS

logger = get_logger(__name__)

class TwitterMultiClient:
    """Twitter concurrent client to handle user and post extraction and
    processing"""

    def __init__(
        self,
        tw_keys,
        app_oauth=False,
        wait_on_rate_limit=True,
        retry_count=3,
        retry_delay=1 * 60,
        timeout=2 * 60,
        parser=tweepy.parsers.JSONParser(),
        **kwargs,
    ):
        self.tw_clients = self._create_clients(
            tw_keys,
            app_oauth=app_oauth,
            wait_on_rate_limit=wait_on_rate_limit,
            retry_count=retry_count,
            retry_delay=retry_delay,
            timeout=timeout,
            parser=parser,
            **kwargs,
        )
        self._client_rotator = deque(enumerate(self.tw_clients, start=1))

    @staticmethod
    def _create_clients(tw_keys, **kwargs) -> list[tweepy.API]:
        clients = []
        with concurrent.futures.ThreadPoolExecutor(
            max_workers=len(tw_keys) + 1
        ) as executor:
            futures = []
            for tw_key in tw_keys:
                job = executor.submit(
                    create_tweepy_client,
                    **tw_key,
                    **kwargs,
                )

                futures.append(job)

            for client_num, future in enumerate(
                concurrent.futures.as_completed(futures), start=1
            ):
                client = future.result()
                logger.info(f"Client number {client_num} initialized.")
                clients.append(client)
        return clients

    def iter_raw_users(
        self,
        screen_names: List[str],
        user_ids: List[int],
    ) -> Iterable[dict]:

        users_of_interest = user_ids if user_ids is not None else screen_names

        CHUNK_SIZE = 100
        TOTAL_USERS = len(users_of_interest)
        TOTAL_BATCHES = math.ceil(TOTAL_USERS / CHUNK_SIZE)
        logger.info(
            f"Twitter User Details: Getting user details for "
            f"{TOTAL_USERS} users in {TOTAL_BATCHES} batches of {CHUNK_SIZE}"
        )

        ids_or_names_queue = queue.SimpleQueue()
        for ids_or_names_chunk in chunked(users_of_interest, CHUNK_SIZE):
            ids_or_names_queue.put_nowait(ids_or_names_chunk)

        while not ids_or_names_queue.empty():
            logger.info(
                "Twitter User Details: Starting threads for extraction"
            )
            with concurrent.futures.ThreadPoolExecutor(
                max_workers=len(self.tw_clients) + 1
            ) as executor:
                futures = []
                for client_num, tw_client in enumerate(
                    self.tw_clients, start=1
                ):
                    if ids_or_names_queue.empty():
                        break
                    ids_or_names = ids_or_names_queue.get_nowait()

                    job = (
                        executor.submit(
                            tw_client.lookup_users,
                            user_id=ids_or_names,
                            include_entities=False,
                            tweet_mode="extended",
                        )
                        if user_ids is not None
                        else executor.submit(
                            tw_client.lookup_users,
                            screen_name=ids_or_names,
                            include_entities=False,
                            tweet_mode="extended",
                        )
                    )

                    futures.append(job)

                    batch_num = TOTAL_BATCHES - ids_or_names_queue.qsize()

                    logger.info(
                        f"Twitter User Details: Sent {len(ids_or_names)} "
                        f"posts, "
                        f"{batch_num}/{TOTAL_BATCHES} total batches, "
                        f"using key number {client_num}."
                    )
                for future in concurrent.futures.as_completed(futures):
                    resp = future.result()
                    yield from resp
            logger.info(
                "Twitter User Details: Fetched some results, closing threads."
            )
        logger.info("Twitter User Details: Fetched all results")

    def iter_raw_posts(
        self,
        post_id_nos: list[int],
    ) -> Iterable[dict]:
        CHUNK_SIZE = 100
        TOTAL_POSTS = len(post_id_nos)
        TOTAL_BATCHES = math.ceil(TOTAL_POSTS / CHUNK_SIZE)
        logger.info(
            f"Twitter Post Details: Getting post details for "
            f"{TOTAL_POSTS} users in {TOTAL_BATCHES} batches of {CHUNK_SIZE}"
        )

        post_id_batch_queue = queue.SimpleQueue()
        for post_id_batch in chunked(post_id_nos, CHUNK_SIZE):
            post_id_batch_queue.put_nowait(post_id_batch)

        while not post_id_batch_queue.empty():
            logger.info(
                "Twitter Post Details: Starting threads for extraction"
            )
            with concurrent.futures.ThreadPoolExecutor(
                max_workers=len(self.tw_clients) + 1
            ) as executor:
                futures = []
                for client_num, tw_client in enumerate(
                    self.tw_clients, start=1
                ):
                    if post_id_batch_queue.empty():
                        break
                    post_ids = post_id_batch_queue.get_nowait()

                    job = executor.submit(
                        tw_client.lookup_statuses,
                        post_ids,
                        include_entities=True,
                        include_ext_alt_text=True,
                        include_card_uri=True,
                        tweet_mode="extended",
                    )
                    futures.append(job)

                    batch_num = TOTAL_BATCHES - post_id_batch_queue.qsize()

                    logger.info(
                        f"Twitter Post Details: Sent {len(post_ids)} posts, "
                        f"{batch_num}/{TOTAL_BATCHES} total batches, "
                        f"using key number {client_num}."
                    )
                for future in concurrent.futures.as_completed(futures):
                    resp = future.result()
                    yield from resp
            logger.info(
                "Twitter Post Details: Fetched some results, closing threads."
            )
        logger.info("Twitter Post Details: Fetched all results")

    def iter_processed_followings(
        self,
        user_ids: list = None,
        screen_names: list = None,
        chunk_size=None,
        upper_limit: int = None,
    ):
        def process_followings(user_followers):
            followings_df = pd.DataFrame(
                user_followers,
                columns=["twitter_follower_id", "twitter_followee_id"],
            )
            return followings_df

        user_followings_iter = self.iter_relations(
            relationship_type="user_followings",
            user_ids=user_ids,
            screen_names=screen_names,
            upper_limit=upper_limit,
        )

        user_following_pairs = (
            (user, following)
            for user, followings_iter in user_followings_iter
            for following in followings_iter
        )

        if chunk_size is None:
            followings_df_batch = process_followings(user_following_pairs)
            yield followings_df_batch
        else:
            for chunked_user_following_pairs in chunked(
                user_following_pairs, chunk_size
            ):
                followings_df_batch = process_followings(
                    chunked_user_following_pairs
                )
                yield followings_df_batch

    def iter_processed_followers(
        self,
        user_ids: list = None,
        screen_names: list = None,
        chunk_size=None,
        upper_limit: int = None,
    ):
        def process_followers(user_followers):
            followers_df = pd.DataFrame(
                user_followers,
                columns=["twitter_followee_id", "twitter_follower_id"],
            )
            return followers_df

        user_followers_iter = self.iter_relations(
            relationship_type="user_followers",
            user_ids=user_ids,
            screen_names=screen_names,
            upper_limit=upper_limit,
        )

        user_follower_pairs = (
            (user, follower)
            for user, followers_iter in user_followers_iter
            for follower in followers_iter
        )

        if chunk_size is None:
            followers_df_batch = process_followers(user_follower_pairs)
            yield followers_df_batch
        else:
            for chunked_user_follower_pairs in chunked(
                user_follower_pairs, chunk_size
            ):
                followers_df_batch = process_followers(
                    chunked_user_follower_pairs
                )
                yield followers_df_batch

    def iter_relations(
        self,
        relationship_type: str,
        user_ids: list = None,
        screen_names: list = None,
        upper_limit: int = None,
    ):
        both_defined = user_ids and screen_names
        neither_defined = not (user_ids or screen_names)
        if both_defined or neither_defined:
            raise ValueError(
                "Only one of user_ids or screen_names must be defined"
            )

        user_id_or_screen_name, users_of_interest = (
            ("user_id", user_ids)
            if user_ids is not None
            else ("screen_name", screen_names)
        )

        TOTAL_USERS = len(users_of_interest)

        logger.info(
            f"Twitter {relationship_type}: Start extraction for {TOTAL_USERS} "
            f"users."
        )

        for user_num, user in enumerate(users_of_interest, start=1):
            relation_ids = self.iter_user_relations(
                relationship_type,
                upper_limit,
                **{user_id_or_screen_name: user},
            )
            yield user, relation_ids
            logger.info(
                f"Twitter {relationship_type}: {user_num}/{TOTAL_USERS} "
                f"users extracted."
            )

        logger.info(
            f"Twitter {relationship_type}: Completed extraction for "
            f"{TOTAL_USERS} users."
        )

    def iter_user_relations(
        self,
        relationship_type: str,
        upper_limit: int = None,
        user_id=None,
        screen_name=None,
        cursor=None,
    ):
        """Returns an iterator with the userids,
           for followers of the given user - user_followers
           that the given user follows - user_followings

        Parameters
        ----------
        relationship_type : str
            [description],
        upper_limit: int
            [description], by default None
        user_id : [type], optional
            [description], by default None
        screen_name : [type], optional
            [description], by default None
        cursor : [type], optional
            [description], by default None


        Yields
        -------
        [type]
            [description]
        """
        user_id_or_screen_name, identifier = (
            ("user_id", user_id)
            if user_id is not None
            else ("screen_name", screen_name)
        )
        user_str = f"{user_id_or_screen_name}: {identifier}"

        logger.info(
            f"Twitter {relationship_type}: Starting extraction for {user_str}."
        )

        cursor = cursor or -1

        client_index, client = self._client_rotator[0]
        target_f = get_target_func(client, relationship_type)

        id_count = 0
        page_count = 1
        while cursor != 0:
            try:
                # Handle rate limit errors
                for attempt_num in (1, 2, 3):
                    try:
                        logger.info(
                            f"Twitter {relationship_type}: "
                            f"Client {client_index}. "
                            f"Extracting for {user_str}, page {page_count}."
                        )
                        results, (prev_cursor, cursor) = target_f(
                            screen_name=screen_name,
                            user_id=user_id,
                            cursor=cursor,
                        )

                        # If extracted IDs hit upper limit, break
                        if upper_limit is not None:
                            id_count += len(results["ids"])
                            if id_count >= upper_limit:
                                cursor = 0
                                logger.info(
                                    f"Stopping extraction at {upper_limit}th "
                                    f""
                                    f"mark"
                                )

                        ids = results["ids"]
                        break
                    except TooManyRequests:
                        # Switch to next client if rate limit reached
                        if attempt_num == 1:
                            prev_client_index = client_index
                            # Rotate deque to switch first client.
                            self._client_rotator.rotate(-1)
                            client_index, client = self._client_rotator[0]

                            logger.info(
                                f"Twitter {relationship_type}: "
                                f"Rate limit reached for client "
                                f"{prev_client_index}, "
                                f"switching to client {client_index}."
                            )
                            # Get new client's target function.
                            target_f = get_target_func(
                                client, relationship_type
                            )

                        # If subsequent client also rate limited, wait for
                        # reset.
                        elif attempt_num == 2:
                            limits = get_rate_limits(client, relationship_type)
                            reset_time = limits["reset"]
                            curr_time = int(time.time())
                            # 2 second waiting buffer
                            sleep_for = max(reset_time - curr_time + 2, 0)
                            logger.info(
                                f"Twitter {relationship_type}: Rate limit "
                                f"reached "
                                f"for subsequent client {client_index}, "
                                f"sleeping for {sleep_for}s until limits reset."
                            )
                            time.sleep(sleep_for)

                        # Should not reach here, but handle just in case
                        else:
                            logger.error(
                                f"Twitter {relationship_type}: "
                                f"Unexpected "
                                f""
                                f"error"
                            )
                            ids = []

            # Skip as long as tweep error occurs
            except TweepyException as ex:
                # Unknown Errors
                logger.exception(
                    f"Twitter {relationship_type}: Skipping extraction for "
                    f"{user_str}, unexpected error occurred. Exception code {str(ex)}"
                )

                ids = []
                break

            yield from ids

            page_count += 1

        logger.info(
            f"Twitter {relationship_type}: "
            f"Completed extraction for "
            f""
            f"{user_str}."
        )

    def iter_processed_users(
        self,
        screen_names: List[str],
        user_ids: List[int],
        chunk_size: Optional[int] = None,
    ) -> Iterable[pd.DataFrame]:
        """
        Given a list of names(as strings), it returns user data in
        Manticore-like output

        Parameters
        ----------
        screen_names : list of usernames in string
        user_ids : list of userids in integer

        Returns
        -------
        result: pd.DataFrame
            DataFrame of relevant fields for all users from twitter query
        """
        iterable_raw_users = self.iter_raw_users(
            screen_names=screen_names, user_ids=user_ids
        )

        if chunk_size is None:
            processed_user = process_users(iterable_raw_users)
            yield processed_user
        else:
            chunked_raw_users = chunked(iterable_raw_users, chunk_size)
            for user_chunk in chunked_raw_users:
                logger.info("processing a user")
                processed_user = process_users(user_chunk)
                yield processed_user

    def iter_processed_posts(
        self,
        post_id_nos: list,
        chunk_size: Optional[int] = None,
    ) -> Iterable[pd.DataFrame]:
        """
        Given a list of names(as strings), it returns user data in
        Manticore-like output

        Parameters
        ----------
        user_names : list of usernames
            iterable list of usernames

        Returns
        -------
        result: pd.DataFrame
            DataFrame of relevant fields for all users from twitter query
        """
        iterable_raw_posts = self.iter_raw_posts(post_id_nos)

        if chunk_size is None:
            processed_post = process_posts(iterable_raw_posts)
            yield processed_post
        else:
            chunked_raw_posts = chunked(iterable_raw_posts, chunk_size)
            for post_chunk in chunked_raw_posts:
                processed_post = process_posts(post_chunk)
                yield processed_post


def create_tweepy_client(
    consumer_key,
    consumer_secret,
    access_token=None,
    access_token_secret=None,
    app_oauth=False,
    **kwargs,
) -> tweepy.API:
    """Accessing the twitter API

    Parameters
    ----------
    consumer_key : [type]
        [description]
    consumer_secret : [type]
        [description]
    access_token : [type]
        [description]
    access_token_secret : [type]
        [description]

    Returns
    -------
    tweepy.API
        API for all the subsequent scraping
    """
    try:
        logger.info(f"Instantiating with consumer key: {consumer_key}")
        if (
            app_oauth
            or (access_token is None)
            or (access_token_secret is None)
        ):
            auth = tweepy.AppAuthHandler(consumer_key, consumer_secret)
        else:
            auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
            auth.set_access_token(access_token, access_token_secret)
        api: tweepy.API = tweepy.API(
            auth,
            **kwargs,
        )
        if app_oauth:
            logger.info("Logged in through app oauth")
        else:
            credential_info = api.verify_credentials()
            logger.info(f"Logged in as: {credential_info['name']}")
        return api
    except Unauthorized:
        logger.exception(
            f"Failed to create tweepy client. Unauthorised user for consumer key: {consumer_key}."
        )
        raise
    except TweepyException as ex:
        logger.exception(ex)
        raise


def get_target_func(client, relationship_type):
    if relationship_type == "user_followers":
        target_f = client.get_follower_ids
    elif relationship_type == "user_followings":
        target_f = client.get_friend_ids
    else:
        raise NotImplementedError
    return target_f


def get_rate_limits(client, relationship_type):
    if relationship_type == "user_followers":
        limits = client.rate_limit_status()["resources"]["followers"][
            "/followers/ids"
        ]
    elif relationship_type == "user_followings":
        limits = client.rate_limit_status()["resources"]["friends"][
            "/friends/ids"
        ]
    else:
        raise NotImplementedError
    return limits


def process_users(tw_users_raw) -> pd.DataFrame:
    """
    Function to reshape results into Manticore-like output

    Parameters
    ----------
    result : json string of user details
        json of relevant fields for users from twitter user query

    Returns
    -------
    pd.DataFrame
        DataFrame of relevant fields for all users from twitter query
    """
    rename_dict = {
        "screen_name": "user_name",
        "id": "user_id",
        "name": "user_full_name",
        "description": "user_bio",
        "verified": "user_is_verified",
        "protected": "user_is_private",
        "location": "user_location",
        "lang": "user_language",
        "followers_count": "user_follower_count",
        "friends_count": "user_friends_count",
        "statuses_count": "user_status_count",
        "url": "user_bio_url",
        "created_at": "user_created_at",
    }
    initial_fields = [
        "screen_name",
        "id",
        "name",
        "description",
        "verified",
        "protected",
        "location",
        "lang",
        "followers_count",
        "friends_count",
        "statuses_count",
        "url",
        "created_at",
    ]
    result = pd.DataFrame(tw_users_raw, columns=initial_fields)
    result["created_at"] = pd.to_datetime(
        result["created_at"], format="%a %b %d %H:%M:%S %z %Y"
    )
    result = result.rename(columns=rename_dict)
    # result = TwitterSchema.users(result)
    return result


def get_media_url_from_extended(extended_media_entities):
    if extended_media_entities is None or extended_media_entities is np.nan:
        return ""
    elif "video_info" in extended_media_entities[0]:
        return [
            i
            for i in extended_media_entities[0]["video_info"]["variants"]
            if i["content_type"] == "video/mp4"
        ][0]["url"]
    else:
        return " | ".join([d["media_url"] for d in extended_media_entities])


def process_posts(tw_posts_raw: Iterable[dict]) -> pd.DataFrame:
    # Set initial field to keep to reduce memory usage
    initial_fields = [
        "user",
        "id",
        "created_at",
        "full_text",
        "retweeted_status",
        "truncated",
        "favorite_count",
        "retweet_count",
        "entities",
        "extended_entities",
        "in_reply_to_status_id",
        "place",
        "geo",
        "possibly_sensitive",
    ]

    # Final columns of interest, and rename to synthesis conventions
    rename_dict = {
        "id": "post_id",
        "created_at": "post_date",
        "full_text": "post_content",
        "post_is_retweet": "post_is_retweet",
        "truncated": "post_is_truncated",
        "favorite_count": "post_like_count",
        "retweet_count": "post_retweet_count",
        "media": "post_media",
        "media_urls": "post_media_urls",
        "hashtags": "post_hashtags",
        "urls": "post_urls",
        "user_mentions": "post_user_mentions",
        "in_reply_to_status_id": "post_reply_to_post_id",
        "place_fullname": "post_place",
        "place_type": "post_place_type",
        "country": "post_country",
        "latitude": "post_latitude",
        "longitude": "post_longitude",
        "possibly_sensitive": "possibly_sensitive",
    }

    result = pd.DataFrame(tw_posts_raw, columns=initial_fields)

    user_df = process_users(result["user"].to_list())

    # When all rows are np.nan, result["extended_entities"].dtype can become
    # float64
    # Checking extended_entities is more accurate with videos or multiple
    # photos.
    if is_string_dtype(result["extended_entities"]):
        result["media"] = (
            result["extended_entities"]
            .str["media"]
            .apply(
                lambda l: " | ".join([d["type"] for d in l])
                if l is not None and l is not np.nan
                else ""
            )
        )
        result["media_urls"] = (
            result["extended_entities"]
            .str["media"]
            .apply(get_media_url_from_extended)
        )

    # Checking result["entities"] instead since no special media to take note
    else:
        result["media"] = (
            result["entities"]
            .str["media"]
            .apply(
                lambda l: " | ".join([d["type"] for d in l])
                if l is not None and l is not np.nan
                else ""
            )
        )

        result["media_urls"] = (
            result["entities"]
            .str["media"]
            .apply(
                lambda l: " | ".join([d["media_url_https"] for d in l])
                if l is not None
                else ""
            )
        )

    result["hashtags"] = (
        result["entities"]
        .str["hashtags"]
        .apply(
            lambda l: " | ".join([d["text"] for d in l])
            if l is not None
            else ""
        )
    )

    result["urls"] = (
        result["entities"]
        .str["urls"]
        .apply(
            lambda l: " | ".join([d["expanded_url"] for d in l])
            if l is not None
            else ""
        )
    )

    result["user_mentions"] = (
        result["entities"]
        .str["user_mentions"]
        .apply(
            lambda l: " | ".join([d["screen_name"] for d in l])
            if l is not None
            else ""
        )
    )

    result["in_reply_to_status_id"] = (
        result["in_reply_to_status_id"].fillna(-1).astype(int)
    )

    result[["place_fullname", "place_type", "country"]] = pd.DataFrame(
        result["place"]
        .apply(
            lambda s: {
                "place_type": np.nan,
                "full_name": np.nan,
                "country": np.nan,
            }
            if s is None
            else s
        )
        .to_list(),
        columns=["full_name", "place_type", "country"],
    )

    # coordinates
    result[["latitude", "longitude"]] = pd.DataFrame(
        result["geo"]
        .apply(
            lambda s: {"type": None, "coordinates": [np.nan, np.nan]}
            if s is None
            else s
        )
        .str["coordinates"]
        .to_list(),
        columns=["latitude", "longitude"],
    )

    # Post is retweet
    result["post_is_retweet"] = result["retweeted_status"].notna()

    # Use full retweeted content
    if result.post_is_retweet.any():
        result.loc[result["post_is_retweet"], "full_text"] = result.loc[
            result["post_is_retweet"], "retweeted_status"
        ].str["full_text"]

    # created at
    result["created_at"] = pd.to_datetime(
        result["created_at"], format="%a %b %d %H:%M:%S %z %Y"
    )

    result = result[rename_dict.keys()].rename(columns=rename_dict)
    result[user_df.columns] = user_df

    # \r causes funky errors when reading/writing as csv
    for col in ["post_content", "user_bio", "user_location"]:
        result[col] = result[col].str.replace("\r", "\n")

    return result


if __name__ == "__main__":

    relationship_names = [
        "business",
    ]

    # user_names = [
    #     "potus",
    #     "cnn",
    #     "billgates",
    #     "ddlovato",
    #     "britneyspears",
    #     "cnnbrk",
    #     "twitter",
    #     "jtimberlake",
    # ]

    # user_ids = [
    #     759251,
    #     143231095,
    #     1145436624584609794,
    #     42714281,
    # ]

    # post_ids = [
    #     "1050174749769314304",
    #     "1296472214339047430",
    #     "1296539976285511680",
    #     "1296636288976728067",
    #     "1296475178743091201",
    #     "1406126681065234432",
    #     "1409789910865780744",
    # ]

    # logger.info("Starting main function for twitter client.")

    multi_tw_client = TwitterMultiClient(
        TWITTER_KEYS, wait_on_rate_limit=False
    )

    # df = pd.concat(multi_tw_client.iter_processed_posts(post_ids))
    # print(df)
    # logger.info(f"Tweet posts extracted, df shape {df.shape}")

    # df = pd.concat(
    #     multi_tw_client.iter_processed_users(
    #         screen_names=user_names, user_ids=None
    #     )
    # )
    # print(df)
    # logger.info(f"User info extracted, df shape {df.shape}")

    # df = pd.concat(
    #     multi_tw_client.iter_processed_users(
    #         screen_names=None, user_ids=user_ids
    #     )
    # )
    # print(df)
    # logger.info(f"User info extracted, df shape {df.shape}")

    df = pd.read_csv("bloomberg_followers.csv")
    followee_list = df.twitter_followee_id.to_list()

    for i in range(len(followee_list)):
        df = pd.concat(
            multi_tw_client.iter_processed_followers(
                user_ids=[followee_list[i]],
                screen_names=None,
                upper_limit=1_000_000,
            )
        )
        df.to_csv(f"chunk_{followee_list[i]}____{i}.csv", index=False)

import os
import json
import logging
import aiohttp
import asyncio
import warnings
import requests
import numpy as np
from datetime import datetime, timedelta, timezone
from typing import Callable, List, Iterator, Optional
from concurrent.futures import ThreadPoolExecutor

from ion_clients.clients.oanda.configs.responses import (
    OandaCandlesResponse,
    FormattedOandaCandles,
    OandaBaseDataResponse,
    OandaLiveStreamResponse,
)
from ion_clients.clients.oanda.configs.requests import (
    ENDPOINTS,
    HEADERS,
    HISTORICAL_GRANULARITY,
    INTERVAL_NAMING,
    Intervals,
    Granularities,
    CurrencyPairs,
)
from ion_clients.clients.oanda.types.candles import (
    OandaReqCurrencies,
    OandaReqGranularities,
    OandaReqIntervals,
)

from ion_clients.clients.oanda.helpers.time import clean_time


async def stream_oanda_live_data(
    symbols: List[OandaReqCurrencies], callback: Callable
):
    """Get oanda live data, limited to 5 data points per call to reduce latency.

    Args:
        symbol (str): The Forex Symbol. Refer to configs.
        granularity (str, optional): Defaults to "S5".

    Returns:
        _type_: _description_
    """
    async with aiohttp.ClientSession(raise_for_status=True) as session:
        async with session.get(
            ENDPOINTS["ENDPOINTS"]["INSTRUMENTS"]["PRICESTREAM"](symbols),
            headers=HEADERS,
        ) as response:
            # Since this is a streaming endpoint, there is no need for timeouts
            async for line in response.content:
                try:
                    line: OandaLiveStreamResponse = json.loads(line)
                    await callback(line)
                except asyncio.exceptions.CancelledError as wse:
                    warnings.warn(
                        f"Websocket connection terminated by user: {str(wse)}"
                    )


def get_oanda_historical_data(
    symbol: OandaReqCurrencies,
    to_date: str = None,
    from_date: str = None,
    count: Optional[int] = None,
    period: Optional[OandaReqIntervals] = None,
    granularity: Optional[OandaReqGranularities] = "S5",
):

    if count and count <= 5000:
        return _get_oanda_historical_single_request_data(
            count=count,
            symbol=symbol,
            to_date=to_date,
            from_date=from_date,
            granularity=granularity,
        )

    if period:
        return _get_oanda_historical_single_request_data(
            symbol=symbol,
            granularity=HISTORICAL_GRANULARITY[period],
            from_date=datetime.utcnow()
            - Intervals[INTERVAL_NAMING[period]].value,
            to_date=datetime.utcnow(),
        )

    else:
        return _get_oanda_historical_data(
            symbol=symbol,
            to_date=to_date,
            from_date=from_date,
            granularity=granularity,
        )


def historical(symbol: OandaReqCurrencies, period: OandaReqIntervals):

    if period == "1M_S":
        return _get_oanda_historical_single_request_data(
            symbol=symbol,
            granularity=HISTORICAL_GRANULARITY[period],
            count=50,
        )

    else:
        return _get_oanda_historical_single_request_data(
            symbol=symbol,
            granularity=HISTORICAL_GRANULARITY[period],
            from_date=datetime.utcnow()
            - Intervals[INTERVAL_NAMING[period]].value,
            to_date=datetime.utcnow(),
        )


def _get_oanda_historical_data(
    symbol: OandaReqCurrencies,
    from_date: str,
    to_date: str,
    granularity: OandaReqGranularities,
    parallelize: bool = False,
) -> OandaBaseDataResponse:
    """Parallelised for multiple calls when the request boundaries fall out of the range accepted by the API parameters."""
    try:
        if not to_date:
            to_date: datetime = datetime.now(timezone.utc)
        if not isinstance(from_date, datetime):
            from_date: datetime = datetime.strptime(from_date, "%Y-%m-%d")
        if not isinstance(to_date, datetime):
            print(type(to_date))
            to_date: datetime = datetime.strptime(to_date, "%Y-%m-%d")
    except ValueError as exc:
        raise ValueError(
            "Check datetime format for from_date \
                and to_date conforms to %Y-%m-%d format"
        ) from exc

    if not Granularities.is_supported(granularity):
        raise ValueError(
            f"You entered an unsupported granularity type {str(granularity)}. \
                Please ensure granularity is one of the following: \
                    {', '.join(Granularities.__members__.keys())}"
        )

    if not CurrencyPairs.is_supported(symbol):
        raise ValueError(
            f"You entered an unsupported currency pair {str(symbol)}. \
                Please ensure currency pair is one of the following: \
                    {', '.join(CurrencyPairs.__members__.keys())}"
        )

    interval: timedelta = Granularities[granularity].value
    data_pts: int = np.ceil((to_date - from_date) / interval).astype(
        int
    )  # Calculate the number of data points we will retrieve
    request_chunks: int = np.ceil(data_pts / 5000).astype(int)
    increment: timedelta = 5000 * interval

    # Determine the date pairs we will want to extract
    from_date_requests: List[datetime] = []
    to_date_requests: List[datetime] = []
    for i in range(request_chunks):
        from_date_requests.append(from_date + increment * i)
        if i != request_chunks - 1:  # if not the last element
            to_date_requests.append(from_date + increment * (i + 1))
        else:
            to_date_requests.append(to_date)

    if request_chunks > 1 and parallelize:
        with ThreadPoolExecutor(max_workers=os.cpu_count() - 1) as executor:
            results: Iterator = executor.map(
                lambda x, y: _get_oanda_historical_single_request_data(
                    symbol=symbol,
                    granularity=granularity,
                    from_date=x,
                    to_date=y,
                ),
                from_date_requests,
                to_date_requests,
            )
            return [result for result in results]

    else:
        if request_chunks > 1:
            warnings.warn(
                f"Your request from {from_date} to {to_date} requires {request_chunks} \
                    requests to fulfill but you chose not to parallize. \
                        This might result in slower response for the results."
            )
            result = []
            for f_date, t_date in zip(from_date_requests, to_date_requests):
                result.append(
                    _get_oanda_historical_single_request_data(
                        symbol=symbol,
                        from_date=f_date,
                        to_date=t_date,
                        granularity=granularity,
                    )
                )
            return result

        return _get_oanda_historical_single_request_data(
            symbol=symbol,
            from_date=from_date,
            to_date=to_date,
            granularity=granularity,
        )


def _get_oanda_historical_single_request_data(
    symbol: OandaReqCurrencies,
    count: int = 5000,
    from_date: datetime = None,
    to_date: datetime = None,
    granularity: OandaReqGranularities = "S5",
) -> OandaBaseDataResponse:

    """Get data based on the limits of a single request"""

    price_type: str = "M"

    if count is None and from_date is None and to_date is None:
        raise ValueError(
            "No count or date value entered. Please make sure at least one argument is filled."
        )

    if count > 5000:
        raise ValueError(
            f"Max Count per Request is only 5000 but you entered {str(count)}. \
                Please ensure that your request size matches the limit!"
        )

    # Request Structuring

    if from_date:
        oanda_params = {
            "price": price_type,
            "from": int(from_date.timestamp()),
            "to": int(to_date.timestamp())
            if to_date
            else int(datetime.today().timestamp()),
            "granularity": granularity,
        }
    else:
        oanda_params = {
            "price": price_type,
            "count": count,
            "granularity": granularity,
        }

    base_url: str = ENDPOINTS["BASE_URL"]
    suffix_url: str = ENDPOINTS["ENDPOINTS"]["INSTRUMENTS"]["CANDLES"](symbol)
    query_endpoint: str = base_url + suffix_url

    response: requests.Response = requests.get(
        query_endpoint,
        params=oanda_params,
        headers=HEADERS,
        timeout=30,
    )
    if response.status_code == 200:
        data = [
            *map(
                __unpack_oanda_base_data,
                response.json()["candles"],
            )
        ]

        logging.info(
            f"Retrieved data point for {symbol} for date ranges {from_date} to {to_date}. {str(len(data))} points included."
        )

        return {
            "response_code": response.status_code,
            "symbol": symbol,
            "granularity": granularity,
            "data": data,
        }

    else:
        return {
            "response_code": response.status_code,
            "symbol": symbol,
            "granularity": granularity,
            "error_message": f"{response.text} for date {from_date} to {to_date}.",
        }


def __unpack_oanda_base_data(
    data: OandaCandlesResponse,
) -> FormattedOandaCandles:

    cleaned_data = {
        "date": clean_time(data["time"]),
        "vol": int(data["volume"]),
    }

    keys = data.keys()

    for key in ["bid", "ask", "mid"]:
        if key in keys:
            if len(keys) == 1 and key == "mid":
                cleaned_data["open"] = float(data[key]["o"])
                cleaned_data["high"] = float(data[key]["h"])
                cleaned_data["low"] = float(data[key]["l"])
                cleaned_data["close"] = float(data[key]["c"])
            else:
                cleaned_data[f"{key}_open"] = float(data[key]["o"])
                cleaned_data[f"{key}_high"] = float(data[key]["h"])
                cleaned_data[f"{key}_low"] = float(data[key]["l"])
                cleaned_data[f"{key}_close"] = float(data[key]["c"])

    return cleaned_data


if __name__ == "__main__":

    print("_get_oanda_historical_data")
    b = _get_oanda_historical_data(
        "EUR_USD",
        from_date="2021-01-01",
        to_date="2021-02-02",
        granularity="M1",
    )
    print(b)

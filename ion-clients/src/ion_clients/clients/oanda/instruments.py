import os
import json
import numpy as np
from typing import Callable, List, Iterator
from datetime import datetime, timedelta
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
from ion_clients.types.oanda import (
    OandaReqCurrencies,
    OandaReqGranularities,
    OandaReqIntervals,
)

from ion_clients.clients.oanda.helpers.time import clean_time

import requests
import aiohttp
import asyncio
import warnings


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


def historical(symbol: OandaReqCurrencies, period: OandaReqIntervals):

    if period == "1M_S":
        return __get_oanda_base_data(
            symbol=symbol,
            granularity=HISTORICAL_GRANULARITY[period],
            count=50,
        )

    else:
        return __get_oanda_base_data(
            symbol=symbol,
            granularity=HISTORICAL_GRANULARITY[period],
            from_date=datetime.utcnow()
            - Intervals[INTERVAL_NAMING[period]].value,
            to_date=datetime.utcnow(),
        )


def get_oanda_historical_data(
    symbol: OandaReqCurrencies,
    from_date: str,
    to_date: str,
    granularity: OandaReqGranularities,
    parallelize: bool = False,
):
    """_summary_

    Args:
        symbol (str): _description_
        from_date (str): In %Y-%m-%d
        to_date (str): _description_
        granularity (str): _description_
    """
    try:
        from_date: datetime = datetime.strptime(from_date, "%Y-%m-%d")
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
    increment: timedelta = 1000 * interval

    from_date_requests: List[datetime] = [
        from_date + increment * i for i in range(request_chunks)
    ]
    to_date_requests: List[datetime] = [
        from_date + increment * i for i in range(1, request_chunks + 1)
    ]

    if request_chunks > 1 and parallelize:
        with ThreadPoolExecutor(max_workers=os.cpu_count() - 1) as executor:
            results: Iterator = executor.map(
                lambda x, y: __get_oanda_base_data(
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
                    __get_oanda_base_data(
                        symbol=symbol,
                        from_date=f_date,
                        to_date=t_date,
                        granularity=granularity,
                    )
                )
            return result

        return __get_oanda_base_data(
            symbol=symbol,
            from_date=from_date,
            to_date=to_date,
            granularity=granularity,
        )


def __get_oanda_base_data(
    symbol: OandaReqCurrencies,
    count: int = 5000,
    from_date: datetime = None,
    to_date: datetime = None,
    granularity: OandaReqGranularities = "S5",
    price_type: str = "M",
) -> OandaBaseDataResponse:

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

    if from_date and to_date:
        oanda_params = {
            "price": price_type,
            "from": int(from_date.timestamp()),
            "to": int(to_date.timestamp()),
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
    a = __get_oanda_base_data(
        symbol="EUR_USD",
        from_date=datetime(2021, 1, 1, 0, 0),
        to_date=datetime(2021, 1, 1, 16, 40),
        granularity="M1",
    )

    b = get_oanda_historical_data(
        "EUR_USD",
        from_date="2021-01-01",
        to_date="2021-02-02",
        granularity="M1",
    )

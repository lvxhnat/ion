from datetime import datetime

from ion.clients.oanda.configs.responses import (
    OandaCandlesResponse,
    FormattedOandaCandles,
    OandaBaseDataResponse,
)
from ion.clients.oanda.configs.requests import (
    ENDPOINTS,
    HEADERS,
    Granularities,
)
from ion.clients.oanda.helpers.time import clean_time

import requests
from typing import List


def get_oanda_live_data(
    symbol: str, granularity: str = "S5"
) -> OandaBaseDataResponse:
    """Get oanda live data, limited to 5 data points per call to reduce latency.

    Args:
        symbol (str): The Forex Symbol. Refer to configs.
        granularity (str, optional): Defaults to "S5".

    Returns:
        _type_: _description_
    """
    return __get_oanda_base_data(symbol, count=5, granularity=granularity)


def get_oanda_historical_data(
    symbol: str, from_date: str, to_date: str, granularity: str
):
    """_summary_

    Args:
        symbol (str): _description_
        from_date (str): _description_
        to_date (str): _description_
        granularity (str): _description_
    """
    ...


def __get_oanda_base_data(
    symbol: str,
    count: int = 5000,
    from_date: datetime.datetime = None,
    to_date: datetime.datetime = None,
    granularity: str = "S5",
    price_type: str = "M",
) -> OandaBaseDataResponse:

    if count is None and from_date is None and to_date is None:
        raise ValueError(
            "No count or date value entered. Please make sure at least one argument is filled."
        )

    if count > 5000:
        raise ValueError(
            f"Max Count per Request is only 5000 but you entered {str(count)}. Please ensure that your request size matches the limit!"
        )

    if not Granularities.is_supported(granularity):
        raise ValueError(
            f"""You entered an unsupported granularity type {str(granularity)}. Please ensure granularity is one of the following: {", ".join(Granularities.__members__.keys())}"""
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
            "data": data,
        }

    else:
        return {
            "response_code": response.status_code,
            "error_message": response.text,
        }


def __unpack_oanda_base_data(
    data: OandaCandlesResponse,
) -> FormattedOandaCandles:

    cleaned_data = {
        "date": clean_time(data["time"]),
        "vol": int(data["volume"]),
    }

    for key in ["bid", "ask", "mid"]:
        if key in data.keys():
            cleaned_data[f"{key}_open"] = float(data[key]["o"])
            cleaned_data[f"{key}_high"] = float(data[key]["h"])
            cleaned_data[f"{key}_low"] = float(data[key]["l"])
            cleaned_data[f"{key}_close"] = float(data[key]["c"])

    return cleaned_data

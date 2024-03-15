import requests
from typing import List
from datetime import datetime
from data_backend.app.configs.secrets import config as secret_config

BASE_API_PATH: str = "https://api.stlouisfed.org/fred"

CATEGORY_ROOT_PATH: str = (
    lambda request_type: f"{BASE_API_PATH}/category/{request_type}?api_key={secret_config.FRED_API_KEY}&file_type=json"
)
SERIES_ROOT_PATH: str = (
    lambda series_id: f"{BASE_API_PATH}/series/observations?series_id={series_id}&api_key={secret_config.FRED_API_KEY}&file_type=json"
)
RELEASE_ROOT_PATH: str = (
    lambda release_id: f"{BASE_API_PATH}/release/series?release_id={release_id}&api_key={secret_config.FRED_API_KEY}&file_type=json"
)


def cast_to_float(value):
    try:
        return float(value)
    except:
        return None


def get_series_data(series_id: str):

    json_data = requests.get(SERIES_ROOT_PATH(series_id)).json()[
        "observations"
    ]

    return [
        *map(
            lambda x: {
                "realtime_start": datetime.strptime(
                    x["realtime_start"], "%Y-%m-%d"
                ),
                "realtime_end": datetime.strptime(
                    x["realtime_end"], "%Y-%m-%d"
                ),
                "date": datetime.strptime(x["date"], "%Y-%m-%d"),
                "value": cast_to_float(x["value"]),
            },
            json_data,
        )
    ]


def get_children_category_ids(category_id: str) -> List[dict]:
    """Get the child category ids. If returns empty list, then it is the last children in the tree."""
    request_path: str = (
        f"{CATEGORY_ROOT_PATH('children')}&exclude_tag_names=discontinued&category_id={category_id}&order_by=popularity&sort_order=desc"
    )
    json_data: List[dict] = requests.get(request_path).json()["categories"]
    processed_json_data: List[dict] = [
        *map(
            lambda entry: {
                "id": entry["id"],
                "name": entry["name"],
                "parent_id": entry["parent_id"],
            },
            json_data,
        )
    ]
    if len(processed_json_data) == 0:
        return {
            "type": "series",
            "data": get_category_series(category_id),
        }
    else:
        # If the json data is not zero, that means that the category id exists. If it doesnt, we move on to get the series available.
        return {
            "type": "category",
            "data": processed_json_data,
        }


def get_category_series(category_id: str) -> List[dict]:
    request_path: str = (
        CATEGORY_ROOT_PATH("series") + f"&category_id={category_id}&limit=500"
    )
    response = requests.get(request_path).json()["seriess"]
    response = [res for res in response if "DISCONTINUED" not in res["title"]]
    return response

def get_release_series_data(release_id: str):
    request_path: str = RELEASE_ROOT_PATH(release_id)
    response = requests.get(request_path).json()
    return response["seriess"]
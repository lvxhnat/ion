import requests
from typing import List
from datetime import datetime

CATEGORY_ROOT_PATH: str = (
    lambda request_type: f"https://api.stlouisfed.org/fred/category/{request_type}?api_key=7f15d978f632266b54771a56c043086f&file_type=json"
)
SERIES_ROOT_PATH: str = (
    lambda series_id: f"https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key=7f15d978f632266b54771a56c043086f&file_type=json"
)


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
                "value": float(x["value"]),
            },
            json_data,
        )
    ]


def get_children_category_ids(category_id: str) -> List[dict]:
    """Get the child category ids. If returns empty list, then it is the last children in the tree."""
    request_path: str = (
        f"{CATEGORY_ROOT_PATH('children')}&category_id={category_id}"
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
        request_path: str = f"{CATEGORY_ROOT_PATH('series')}&category_id={category_id}&limit=100"
        json_data: List[dict] = requests.get(request_path).json()["seriess"]
        return {
            "type": "series",
            "data": json_data,
        }
    else:
        # If the json data is not zero, that means that the category id exists. If it doesnt, we move on to get the series available.
        return {
            "type": "category",
            "data": processed_json_data,
        }


def get_category_series(category_id: str) -> List[dict]:
    request_path: str = (
        CATEGORY_ROOT_PATH("series")
        + f"&category_id={category_id}&order_by=popularity&sort_order=desc"
    )
    json_data: List[dict] = requests.get(request_path).json()["seriess"]
    return json_data

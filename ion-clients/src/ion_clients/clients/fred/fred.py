from typing import List
import requests

CATEGORY_ROOT_PATH: str = (
    lambda request_type: f"https://api.stlouisfed.org/fred/category/{request_type}?api_key=7f15d978f632266b54771a56c043086f&file_type=json"
)


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
        request_path: str = (
            f"{CATEGORY_ROOT_PATH('series')}&category_id={category_id}"
        )
        json_data: List[dict] = requests.get(request_path).json()["seriess"]
        print(json_data)
        return {
            "type": "series",
            "data": processed_json_data,
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

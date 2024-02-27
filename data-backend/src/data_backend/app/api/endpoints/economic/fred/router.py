from fastapi import APIRouter
from datetime import datetime

from data_backend.app.api.endpoints.economic.fred.clients.search import (
    get_search_results,
)
from data_backend.app.api.endpoints.economic.fred.clients.series import (
    get_children_category_ids,
    get_series_data,
)
from data_backend.app.api.endpoints.economic.fred.params import (
    FredChildParams,
    FredSeriesParams,
    FredSearchParams,
)

router = APIRouter(
    tags=["government"],
)


@router.get("/health")
def health_check():
    return {"status": "healthy"}


@router.post("/series")
def get_series(params: FredSeriesParams):
    return get_series_data(params.series_id)


@router.post("/search")
def get_search(params: FredSearchParams):
    return get_search_results(params.query, params.limit)


@router.post("/child")
def get_fred_child_nodes(params: FredChildParams):
    return get_children_category_ids(params.category_id)


@router.get("/root")
def get_fred_parent_nodes():
    root_id = 0
    l1_child_nodes = []

    # ID 0 is the top root node. We get the children
    data = get_children_category_ids(root_id)
    parent_nodes = data["data"]
    # Now we treat these children as parent nodes to get their children
    for parent_node in parent_nodes:
        time_now = datetime.now()
        parent_node["last_updated"] = time_now
        l1_child_nodes.append(
            {
                "parent_node": parent_node,
                "child_node": [
                    *map(
                        lambda s: {**s, "last_updated": time_now},
                        get_children_category_ids(parent_node["id"])["data"],
                    )
                ],
            }
        )
    # Format data for writing into DB, since it does not exist
    data = []
    for entry in l1_child_nodes:
        data.append(entry["parent_node"])
        data += entry["child_node"]

    return l1_child_nodes

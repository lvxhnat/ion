from fastapi import APIRouter

from data_ingestion.app.api.api_v1.configs.base_config import (
    settings as base_settings,
)
from data_ingestion.app.singleton import mongodb_client, test_connection
from data_ingestion.app.api.api_v1.models.database.mongodb.params import (
    SecurityFunctionsParams,
    TradeableAssetsParams,
    ETFInfoRequestParams,
)

router = APIRouter(
    prefix=f"{base_settings.BASE_ENDPOINT_PREFIX}/autocomplete",
    tags=["autocomplete"],
)


def query_mongodb(query: str, path: str):
    return [
        {
            "$search": {
                "compound": {
                    "should": [
                        {
                            "autocomplete": {
                                "query": query,
                                "path": path,
                            },
                        },
                    ],
                },
            }
        },
        {"$limit": 10},
        {
            "$project": {
                "_id": 0,  # Exclude _id from the query
            }
        },
    ]


@router.get("/ping")
def ping():
    """Test Connection to MongoDB Server"""
    return {"status": test_connection()}


@router.get("/allFunctions")
def get_all_functions():
    return list(
        mongodb_client[base_settings.MONGODB_ASSET_INFO_TABLE][
            base_settings.MONGODB_FUNCTIONS_COLLECTION
        ].find({}, {"_id": 0})
    )


@router.post("/securityFunctions")
def get_function_autocomplete_info(params: SecurityFunctionsParams):

    query: str = params.query

    if query:
        pipeline = query_mongodb(
            query, base_settings.MONGODB_FUNCTIONS_COLLECTION_QUERY_FIELD
        )
        return list(
            mongodb_client[base_settings.MONGODB_ASSET_INFO_TABLE][
                base_settings.MONGODB_FUNCTIONS_COLLECTION
            ].aggregate(pipeline)
        )

    else:
        return list(
            mongodb_client[base_settings.MONGODB_ASSET_INFO_TABLE][
                base_settings.MONGODB_FUNCTIONS_COLLECTION
            ]
            .find()
            .limit(5)
        )


@router.post("/tradeableAssets")
def get_asset_autocomplete_info(params: TradeableAssetsParams):

    if not params.query_type and not params.query_tick:
        raise ValueError("Need to contain query_type or query_tick.")

    if params.query_tick:
        query = (
            base_settings.MONGODB_TICK_COLLECTION_QUERY_TICK,
            params.query_tick,
        )
    else:
        query = (
            base_settings.MONGODB_FUNCTIONS_COLLECTION_QUERY_FIELD,
            params.query_type,
        )

    if query:
        pipeline = query_mongodb(query[1], query[0])
        return list(
            mongodb_client[base_settings.MONGODB_TICK_INFO_TABLE][
                base_settings.MONGODB_TICK_COLLECTION
            ].aggregate(pipeline)
        )

    else:
        return list(
            mongodb_client[base_settings.MONGODB_TICK_INFO_TABLE][
                base_settings.MONGODB_TICK_COLLECTION
            ]
            .find()
            .limit(5)
        )


@router.get("/etfAssetTypes")
def get_etf_asset_types():
    return [
        *mongodb_client[base_settings.MONGODB_ASSET_INFO_TABLE][
            base_settings.MONGODB_ETFS_COLLECTION
        ].distinct("asset_class")
    ]


@router.post("/etfInfos")
def get_etf_info(params: ETFInfoRequestParams):

    try:

        if not isinstance(params.request["filter"], list):
            raise ValueError("Filter on multiple field in list")
        if not isinstance(params.request["sort"], list):
            raise ValueError("Sort on multiple field in list")

        exclude_fields = {
            "_id": False,
            "other_alternative_etfs": False,
            "alternative_etfs": False,
            "etf_home_page": False,
        }
        if params.request["filter"][0]["asset_class"] == "All":
            find_kwargs = (
                {},
                exclude_fields,
            )
        else:
            find_kwargs = (
                {"$and": params.request["filter"]},
                exclude_fields,
            )

        request_info = (
            mongodb_client[base_settings.MONGODB_ASSET_INFO_TABLE][
                base_settings.MONGODB_ETFS_COLLECTION
            ]
            .find(*find_kwargs)
            .sort(
                [
                    *map(
                        lambda d: tuple(d.items())[0],
                        params.request["sort"],
                    )
                ]
            )
            .limit(50)
        )

        return [*map(lambda s: {"id": s[0], **s[1]}, enumerate(request_info))]

    except Exception:
        raise
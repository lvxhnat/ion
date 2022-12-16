from dotenv import load_dotenv
from fastapi import APIRouter

from data_ingestion.app.core.config import settings
from data_ingestion.app.singleton import mongodb_client
from data_ingestion.app.api.api_v1.models.autocomplete import SecurityFunctions

load_dotenv()

router = APIRouter(prefix="/autocomplete", tags=["autocomplete"],)


@router.post("/securityFunctions")
def get_asset_autocomplete_info(params: SecurityFunctions):

    query: str = params.query

    if query:
        pipeline = [
            {
                "$search": {
                    "compound": {
                        "should": [
                            {
                                "autocomplete": {
                                    "query": query,
                                    "path": settings.MONGODB_FUNCTIONS_COLLECTION_QUERY_FIELD,
                                    "fuzzy": {
                                        "prefixLength": 1,
                                    },
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
        return list(
            mongodb_client[settings.MONGODB_ASSET_INFO_TABLE][
                settings.MONGODB_FUNCTIONS_COLLECTION
            ].aggregate(pipeline)
        )

    else:
        return list(
            mongodb_client[settings.MONGODB_ASSET_INFO_TABLE][
                settings.MONGODB_FUNCTIONS_COLLECTION
            ]
            .find()
            .limit(5)
        )

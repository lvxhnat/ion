from data_ingestion.app.core.config import settings
from data_ingestion.app.singleton import mongodb_client


def autocomplete_ticker(query: str):
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


if __name__ == "__main__":
    print(autocomplete_ticker("F"))

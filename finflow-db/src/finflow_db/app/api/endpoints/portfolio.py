from fastapi import APIRouter, Depends

# Autocomplete can be implemented by postgres, elastic etc, so a generic autocomplete file is created for it

router = APIRouter(
    tags=["query"],
)

@router.get("/health")
def health_check():
    return {"status": "healthy"}

@router.post("/query")
def query_asset_search_table(params):
    pass
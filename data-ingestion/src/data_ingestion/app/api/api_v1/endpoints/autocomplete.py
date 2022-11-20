from dotenv import load_dotenv
from fastapi import APIRouter

from data_ingestion.app.api.api_v1.models.autocomplete import SecurityFunctions
from data_ingestion.app.api.api_v1.endpoints import mongodb

load_dotenv()

router = APIRouter()


@router.post("/securityFunctions")
def get_asset_autocomplete_info(params: SecurityFunctions):
    return mongodb.autocomplete_ticker(params.query)

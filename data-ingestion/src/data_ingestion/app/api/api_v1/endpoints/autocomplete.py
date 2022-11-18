from dotenv import load_dotenv

from fastapi import APIRouter

load_dotenv()

router = APIRouter()


@router.post("/assetInfo")
def get_asset_autocomplete_info(params):
    return

from fastapi import APIRouter
from params import HistoricalEquityParams

import finflow_algos.utils 

router = APIRouter()

@router.post("/historical")
def get_historical(
    params: HistoricalEquityParams,
):
    pass
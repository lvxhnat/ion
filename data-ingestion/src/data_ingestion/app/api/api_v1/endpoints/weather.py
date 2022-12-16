from ion_clients.clients.weather.wttr import get_wttr_weather_data
from ion_clients.clients.weather.types.wttr import WttrBaseWeatherObject
from fastapi import APIRouter

router = APIRouter(
    prefix="/weather",
    tags=["weather"],
)


@router.post("/wttr")
def get_weather_data():
    data: WttrBaseWeatherObject = get_wttr_weather_data("OAK")
    return data

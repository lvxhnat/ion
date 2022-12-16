from ion_clients.clients.weather.wttr import get_wttr_weather_data
from ion_clients.clients.weather.types.wttr import WttrBaseWeatherObject

from data_ingestion.app.api.api_v1.models.weather import WeatherData

from fastapi import APIRouter

router = APIRouter(
    prefix="/weather",
    tags=["weather"],
)


@router.post("/wttr")
def get_weather_data(params: WeatherData):
    data: WttrBaseWeatherObject = get_wttr_weather_data(params.iata)
    return data

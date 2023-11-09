import requests
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from finflow_ingestion.app.api.endpoints.weather.open_weather.models import OpenWeatherDTO
from finflow_ingestion.app.api.endpoints.weather.params import CurrentWeatherParams
from finflow_ingestion.app.common.tables import POSTGRES_TABLES
from finflow_algos.services.postgres.base import get_session

from finflow_algos.utils.database.base import order_search

router = APIRouter(
    tags=["weather"],
)

env_loaded = load_dotenv()

@router.get("/health")
def health_check():
    return {"status": "healthy"}

@router.post("/current")
def get_current_weather_conditions(
    params: CurrentWeatherParams,
    session: Session = Depends(get_session),
):

    postgres_table = POSTGRES_TABLES.GLOBAL_AREA_LATLON

    query = order_search(
        session,
        filters=[
            postgres_table.name.like(params.city),
            postgres_table.country_code.like(params.country_code),
        ],
        table_schema=postgres_table,
    )
    
    data: OpenWeatherDTO = get_current_weather(
        query["latitude"], query["longitude"]
    )

    return {
        "city": data["name"],
        "sunrise": data["sys"]["sunrise"],
        "sunset": data["sys"]["sunset"],
        "weather_condition": data["weather"][0]["description"],
        "weather_icon_url": data["weather_icon_url"],
        "temp": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "temp_min": data["main"]["temp_min"],
        "temp_max": data["main"]["temp_max"],
        "pressure": data["main"]["pressure"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "wind_deg": data["wind"]["deg"],
    }
    
def get_current_weather(lat: float, lon: float, api_key: str) -> OpenWeatherDTO:
    
    url: str = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={api_key}"

    r: requests.Request = requests.get(url)
    data: dict = r.json()
    del r 
    
    icon_code: str = data['weather'][0]['icon']
    
    data['weather_icon_url'] = f"http://openweathermap.org/img/wn/{icon_code}@2x.png"
    
    return data

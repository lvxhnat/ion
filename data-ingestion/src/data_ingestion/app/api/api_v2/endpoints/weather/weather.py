from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from data_ingestion.app.api.api_v2.configs.base_config import (
    configs as base_configs,
)

from ion_clients.services.postgres.actions import order_search, get_session
from ion_clients.clients.weather.openweather import get_current_weather
from ion_clients.clients.weather.types.openweather import OpenWeatherDTO

from data_ingestion.app.api.api_v2.models.weather.params import (
    CurrentWeatherParams,
)
from data_ingestion.app.api.api_v2.models.weather.params import (
    CurrentWeatherParams,
)

router = APIRouter(
    prefix=f"/weather",
    tags=["weather"],
)


@router.get("/health", tags=["health"])
def health_check():
    return {"status": "healthy"}


@router.post("/current")
def get_current_weather_conditions(
    params: CurrentWeatherParams,
    session: Session = Depends(get_session),
):

    postgres_table = base_configs.POSTGRES_TABLES["global_area_latlon"]

    query = order_search(
        TableSchema=postgres_table,
        session=session,
        filters=[
            postgres_table.name.like(params.city),
            postgres_table.country_code.like(params.country_code),
        ],
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

from sqlalchemy.orm import Session

from ion_clients.clients.weather import (
    wttr as wttrAPI,
    openweather as openweatherAPI,
)
from ion_clients.clients.weather.types import (
    wttr as wttrTypes,
    openweather as openweatherTypes,
)
from ion_clients.services.postgres.actions import order_search
from ion_clients.services.postgres.postgres_service import get_session

from data_ingestion.app.api.api_v1.configs.base_config import (
    settings as base_settings,
)
from data_ingestion.app.api.api_v1.models.weather.params import (
    CurrentWeatherParams,
)
from data_ingestion.app.api.api_v1.models.weather.dtos import CurrentWeatherDTO
from data_ingestion.app.api.api_v1.models.database.postgres.tables import (
    tables as postgres_tables,
)
from fastapi import APIRouter, Depends

router = APIRouter(
    prefix=f"{base_settings.BASE_ENDPOINT_PREFIX}/weather",
    tags=["weather"],
)


@router.get("/ping")
def ping():
    return {"status": 200}


@router.post("/currentWeather")
def get_current_weather_conditions(
    params: CurrentWeatherParams,
    session: Session = Depends(get_session),
):
    return get_openweather_weather_data(
        session, params.city, params.country_code
    )


def get_openweather_weather_data(
    session, city: str, country_code
) -> CurrentWeatherDTO:
    postgres_table = postgres_tables["global_area_latlon"]
    query = order_search(
        session,
        table_schema=postgres_table,
        filters=[
            postgres_table.name.like(city),
            postgres_table.country_code.like(country_code),
        ],
    )
    data: openweatherTypes.OpenWeatherDTO = openweatherAPI.get_current_weather(
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


def get_wttr_weather_data(locale: str) -> CurrentWeatherDTO:
    data: wttrTypes.WttrBaseWeatherObject = wttrAPI.get_wttr_weather_data(
        locale
    )
    return data

import requests
from ion_clients.clients.weather.types.wttr import WttrBaseWeatherObject


def get_wttr_weather_data(city: str) -> WttrBaseWeatherObject:
    return requests.get(f"https://wttr.in/{city}?format=j1").json()

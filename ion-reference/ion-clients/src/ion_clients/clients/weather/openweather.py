import os
import requests
from dotenv import load_dotenv

from ion_clients.clients.weather.types.openweather import OpenWeatherDTO
from ion_clients.clients.configs import ingestion_settings

env_loaded = load_dotenv()


def get_current_weather(lat: float, lon: float, api_key: str = ingestion_settings.OPENWEATHER_API_KEY) -> OpenWeatherDTO:
    
    url: str = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={api_key}"

    r: requests.Request = requests.get(url)
    data: dict = r.json()
    del r 
    
    icon_code: str = data['weather'][0]['icon']
    
    data['weather_icon_url'] = f"http://openweathermap.org/img/wn/{icon_code}@2x.png"
    
    return data

    
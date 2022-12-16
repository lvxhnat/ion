from typing import Literal, List, Dict, TypeVar
from pydantic import BaseModel

T = TypeVar("T")

WeatherDescType = Literal[
    "Clear",
    "Sunny",
    "Partly cloudy",
    "Cloudy",
    "Overcast",
    "Mist",
    "Patchy rain possible",
    "Patchy snow possible",
    "Patchy sleet possible",
    "Patchy freezing drizzle possible",
    "Thundery outbreaks possible",
    "Blowing snow",
    "Blizzard",
    "Fog",
    "Freezing fog",
    "Patchy light drizzle",
    "Light drizzle",
    "Freezing drizzle",
    "Heavy freezing drizzle",
    "Patchy light rain",
    "Light rain",
    "Moderate rain at times",
    "Moderate rain",
    "Heavy rain at times",
    "Heavy rain",
    "Light freezing rain",
    "Moderate or heavy freezing rain",
    "Light sleet",
    "Moderate or heavy sleet",
    "Patchy light snow",
    "Light snow",
    "Patchy moderate snow",
    "Moderate snow",
    "Patchy heavy snow",
    "Heavy snow",
    "Ice pellets",
    "Light rain shower",
    "Moderate or heavy rain shower",
    "Torrential rain shower",
    "Light sleet showers",
    "Moderate or heavy sleet showers",
    "Light snow showers",
    "Moderate or heavy snow showers",
    "Patchy light rain with thunder",
    "Moderate or heavy rain with thunder",
    "Patchy light snow with thunder",
    "Moderate or heavy snow with thunder",
]


class _CurrentConditionSubObj(BaseModel):
    FeelsLikeC: str
    FeelsLikeF: str
    cloudcover: str
    humidity: str
    localObsDateTime: str
    observation_time: str
    precipInches: str
    precipMM: str
    pressure: str
    pressureInches: str
    temp_C: str
    temp_F: str
    uvIndex: str
    visibility: str
    visibilityMiles: str
    weatherCode: str
    weatherDesc: List[Dict[Literal["value"], WeatherDescType]]
    weatherIconUrl: List[Dict[Literal["value"], T]]
    winddir16Point: str
    winddirDegree: str
    windspeedKmph: str
    windspeedMiles: str


class _NearestAreaSubObj(BaseModel):
    areaName: List[Dict[Literal["value"], T]]
    country: List[Dict[Literal["value"], T]]
    latitude: str
    longitude: str
    population: str
    region: List[Dict[Literal["value"], T]]
    weatherUrl: List[Dict[Literal["value"], T]]


class _RequestSubObj(BaseModel):
    query: str
    type: str


class _WeatherAstronomySubObj(BaseModel):
    moon_illumination: str
    moon_phase: str
    moonrise: str
    moonset: str
    sunrise: str
    sunset: str


class WeatherHourlySubObj(BaseModel):
    DewPointC: str
    DewPointF: str
    FeelsLikeC: str
    FeelsLikeF: str
    HeatIndexC: str
    HeatIndexF: str
    WindChillC: str
    WindChillF: str
    WindGustKmph: str
    WindGustMiles: str
    chanceoffog: str
    chanceoffrost: str
    chanceofhightemp: str
    chanceofovercast: str
    chanceofrain: str
    chanceofremdry: str
    chanceofsnow: str
    chanceofsunshine: str
    chanceofthunder: str
    chanceofwindy: str
    cloudcover: str
    humidity: str
    precipInches: str
    precipMM: str
    pressure: str
    pressureInches: str
    tempC: str
    tempF: str
    time: str
    uvIndex: str
    visibility: str
    visibilityMiles: str
    weatherCode: str
    weatherDesc: List[Dict[Literal["value"], WeatherDescType]]
    weatherIconUrl: List[Dict[Literal["value"], T]]
    winddir16Point: str
    winddirDegree: str
    windspeedKmph: str
    windspeedMiles: str


class _WeatherSubObj(BaseModel):
    astronomy: List[_WeatherAstronomySubObj]
    vgtempC: str
    avgtempF: str
    date: str
    hourly: List[WeatherHourlySubObj]
    maxtempC: str
    maxtempF: str
    mintempC: str
    mintempF: str
    sunHour: str
    totalSnow_cm: str
    uvIndex: str


class WttrBaseWeatherObject(BaseModel):
    current_condition: _CurrentConditionSubObj
    nearest_area: List[_NearestAreaSubObj]
    request: List[_RequestSubObj]
    weather: List[_WeatherSubObj]

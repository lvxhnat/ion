from pydantic import BaseModel


class CurrentWeatherProps(BaseModel):
    city: str
    country_code: str


class CurrentWeatherDTO(BaseModel):
    city: str
    sunrise: int 
    sunset: int
    weather_condition: str 
    weather_icon_url: str
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int
    wind_speed: float 
    wind_deg: float
    
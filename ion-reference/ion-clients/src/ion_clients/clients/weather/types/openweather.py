from typing import List
from pydantic import BaseModel

class _CoordObject(BaseModel):
    lat: float 
    lon: float 

class _ConditionObject(BaseModel):
    id: int
    main: str
    description: str 
    icon: str

class _MainWeatherObject(BaseModel):
    temp: float 
    feels_like: float 
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int

class _WindObject(BaseModel):
    speed: float 
    deg: int 
    
class _CloudObject(BaseModel):
    all: int 
    
class _SysObject(BaseModel):
    type: int 
    id: int 
    country: str 
    sunrise: int 
    sunset: int 
    
class OpenWeatherBaseWeatherObject(BaseModel):
    coord: _CoordObject
    weather: List[_ConditionObject]
    base: str 
    main: _MainWeatherObject
    visibility: int
    wind: _WindObject
    clouds: _CloudObject
    dt: int 
    sys: _SysObject
    timezone: int 
    id: int 
    name: str 
    cod: int
    
class OpenWeatherDTO(OpenWeatherBaseWeatherObject):
    weather_icon_url: str
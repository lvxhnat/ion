from pydantic import BaseModel

class WeatherData(BaseModel):
    iata: str

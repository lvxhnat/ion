from pydantic import BaseModel


class CurrentWeatherParams(BaseModel):
    city: str
    country_code: str

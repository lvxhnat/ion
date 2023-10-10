from pydantic import BaseModel


class GeoNamesData(BaseModel):
    # Data Returned directly from the scrapers
    geoname_id: str
    name: str
    ascii_name: str
    alternate_names: str
    latitude: str
    longitude: str
    feature_class: str
    feature_code: str
    country_code: str
    cc2: str
    admin1_code: str
    admin2_code: str
    admin3_code: str
    admin4_code: str
    population: str
    elevation: str
    dem: str
    timezone: str
    modification_date: str

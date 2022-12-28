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
    admin1_cod: str
    admin2_cod: str
    admin3_cod: str
    admin4_cod: str
    populatio: str
    elevatio: str
    dem: str
    timezon: str
    modification_dat: str

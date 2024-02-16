import requests
from data_backend.app.configs.secrets import config as secret_config

BASE_API_PATH: str = "https://api.stlouisfed.org/fred"

def search_series(
    search_term: str,
    limit: int = 1000
):
    search_term = "+".join(search_term.split(" "))
    url = f"{BASE_API_PATH}/series/search?search_text={search_term}&api_key={secret_config.FRED_API_KEY}&limit={limit}&file_type=json"
    json_data = requests.get(url).json()
    return json_data
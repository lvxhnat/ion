import requests

from ion_clients.clients.configs import ingestion_settings


def get_top_headlines(api_key: str, page_size: int = 100):
    base_settings: str = f"https://newsapi.org/v2/top-headlines?country=us&pageSize={page_size}&apiKey={api_key}"
    response: requests.Response = requests.get(base_settings)
    return response.json()


if __name__ == "__main__":
    print(get_top_headlines(ingestion_settings.NEWS_API_KEY))

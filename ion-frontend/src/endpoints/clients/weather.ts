import { request } from 'services/request';
import { ENDPOINTS } from 'endpoints/endpoints';

export const getCurrentWeather = (city: string, country_code: string) => {
    return request("data-ingestion").post(ENDPOINTS.PRIVATE.CURRENT_WEATHER_ENDPOINT, {
        city: city,
        country_code: country_code,
    });
};

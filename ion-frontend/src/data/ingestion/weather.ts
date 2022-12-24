import { dataIngestionRequest } from 'services/request';
import { REQUEST_ENDPOINTS } from 'data/endpoints/weather';

export const getCurrentWeather = (city: string, country_code: string) => {
    return dataIngestionRequest.post(REQUEST_ENDPOINTS.CURRENT_WEATHER.ENDPOINT, {
        city: city,
        country_code: country_code,
    });
};

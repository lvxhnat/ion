import { dataIngestionRequest } from 'services/request';
import { ENDPOINTS } from 'common/constant/endpoints';

export const getCurrentWeather = (city: string, country_code: string) => {
    return dataIngestionRequest.post(ENDPOINTS.PRIVATE.CURRENT_WEATHER_ENDPOINT, {
        city: city,
        country_code: country_code,
    });
};

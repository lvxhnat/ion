import { ENDPOINTS } from "endpoints/endpoints";
import request from "services";

export const getReleaseSeries = (release_id: string) => {
    return request("data-backend").get(
        `${ENDPOINTS.PRIVATE.FRED_RELEASE_ENDPOINT}/${release_id}`
    );
};

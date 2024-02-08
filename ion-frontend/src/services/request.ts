import axios from 'axios';
import { ENDPOINTS } from 'endpoints/endpoints';

const request = (type: 'ion-backend' | 'data-ingestion') => {
    const axiosInstance = axios.create({
        baseURL:
            type === 'data-ingestion'
                ? ENDPOINTS.BASEURLS.DATA_INGESTION
                : ENDPOINTS.BASEURLS.ION_BACKEND,
        timeout: 60000,
        headers: {
            Authorization: 'null',
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    });
    axiosInstance.interceptors.response.use((response: any) => {
        return response;
    }, error);

    return axiosInstance;
};

async function error(error: any) {
    const originalRequest = error.config;

    console.error(error);

    if (typeof error.response === 'undefined') {
        // window.location.href = '/error404/';
        return await Promise.reject(error);
    }

    if (
        error.response.data.code === 'token_not_valid' &&
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized'
    ) {
    }
    console.error(error.response);
    // specific error handling done elsewhere
    return await Promise.reject(error);
}

export { request };

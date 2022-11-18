import axios from 'axios';
import { ENDPOINTS } from 'common/constant/endpoints';

const ionIngestionRequest = axios.create({
    baseURL: ENDPOINTS.BASEURLS.ION_INGESTION,
    timeout: 10000,
    headers: {
        Authorization: 'null',
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

const dataIngestionRequest = axios.create({
    baseURL: ENDPOINTS.BASEURLS.DATA_INGESTION,
    timeout: 10000,
    headers: {
        Authorization: 'null',
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

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

ionIngestionRequest.interceptors.response.use((response: any) => {
    return response;
}, error);

dataIngestionRequest.interceptors.response.use((response: any) => {
    return response;
}, error);

export { ionIngestionRequest, dataIngestionRequest };

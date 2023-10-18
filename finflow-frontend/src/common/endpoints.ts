export const BASE_URL = process.env.REACT_APP_BASE_URL

export const ENDPOINTS = {
    AUTH: {
        ACCESS_TOKEN: `${BASE_URL}/auth/token/`,
        REFRESH_TOKEN: `${BASE_URL}/auth/token/refresh`
    }
}
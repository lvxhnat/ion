import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const request = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: {
		Authorization: 'null',
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

request.interceptors.response.use(
	(response: any) => {
		return response;
	},
	async function (error: any) {
		const originalRequest = error.config;

		console.error(error);

		if (typeof error.response === 'undefined') {
			window.location.href = '/error404/';
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
            originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
		) {

		}
		console.error(error.response);
		// specific error handling done elsewhere
		return Promise.reject(error);
	},
);

export default request;
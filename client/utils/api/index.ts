import { GetServerSidePropsContext, NextPageContext } from 'next';
import axios from 'axios';
import { PortfolioApi } from './portfolio';

export type ApiReturnType = {
	portfolio: ReturnType<typeof PortfolioApi>;
};

export const baseUrl = 'http://localhost:5000/';
export const clientUrl = 'http://localhost:3000/';
export const allUrls = {
	portfolio: 'portfolioWork/works',
	refresh: 'auth/refresh',
};

export const Api = (
	ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
	const headers = ctx?.req?.headers.cookie
		? { Cookie: ctx?.req?.headers.cookie }
		: undefined;

	const instance = axios.create({
		baseURL: baseUrl,
		withCredentials: true,
		headers: headers,
	});

	instance.interceptors.response.use(
		(config: any) => {
			return config;
		},
		async (error) => {
			const originalRequest = error.config;
			if (
				error.response.status == 401 &&
				error.config &&
				!error.config._isRetry
			) {
				originalRequest._isRetry = true;
				try {
					const response = await axios.get(
						baseUrl + allUrls.refresh,
						{ withCredentials: true }
					);
					return instance.request(originalRequest);
				} catch (e: any) {
					console.log(e?.response?.data.message);
				}
			}
			throw error;
		}
	);

	return {
		portfolio: PortfolioApi(instance),
	};
};

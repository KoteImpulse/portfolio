import { IPortfolioWork } from './../../types/portfolioWork';
import { AxiosInstance } from 'axios';

import { allUrls } from './index';

export const PortfolioApi = (instance: AxiosInstance) => ({
	async getPortfolio(
		sortBy?: 'ASC' | 'DESC',
		take?: number,
		workId?: number,
		category?: string[],
		workPageId?: number
	): Promise<{ works: IPortfolioWork[]; left: number }> {
		const { data } = await instance.get<{
			works: IPortfolioWork[];
			left: number;
		}>(`${allUrls.portfolio}`, {
			params: { take, sortBy, workId, category, workPageId },
		});
		return data;
	},
	async getOnePortfolioWork(workId?: number): Promise<IPortfolioWork> {
		const { data } = await instance.get<IPortfolioWork>(
			`${allUrls.portfolio}/${workId}`
		);
		return data;
	},
});

import {
	IPortfolioWork,
	PortfolioAction,
	PortfolioActionTypes,
} from '../../types/portfolioWork';

export const setPortfolio = (
	payload: IPortfolioWork[] | []
): PortfolioAction => {
	return { type: PortfolioActionTypes.SET_PORTFOLIO, payload };
};
export const setPortfolioLeft = (payload: number): PortfolioAction => {
	return { type: PortfolioActionTypes.SET_PORTFOLIO_LEFT, payload };
};
export const setPortfolioWork = (payload: IPortfolioWork): PortfolioAction => {
	return { type: PortfolioActionTypes.SET_PORTFOLIO_WORK, payload };
};

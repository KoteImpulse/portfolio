import {
	PortfolioAction,
	PortfolioState,
	PortfolioActionTypes,
	IPortfolioWork,
} from './../../types/portfolioWork';

const initialState: PortfolioState = {
	portfolio: [],
	portfolioLeft: 0,
	portfolioWork: {} as IPortfolioWork,
};

export const portfolioReducer = (
	state = initialState,
	action: PortfolioAction
): PortfolioState => {
	switch (action.type) {
		case PortfolioActionTypes.SET_PORTFOLIO:
			return { ...state, portfolio: action.payload };
		case PortfolioActionTypes.SET_PORTFOLIO_LEFT:
			return { ...state, portfolioLeft: action.payload };
		case PortfolioActionTypes.SET_PORTFOLIO_WORK:
			return { ...state, portfolioWork: action.payload };
		default:
			return state;
	}
};

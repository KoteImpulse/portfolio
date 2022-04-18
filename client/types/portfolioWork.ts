export interface IPortfolioWork {
	id: number;
	brand: string;
	tagline: string;
	description: string;
	maincategory: string;
	category: string[];
	link: string;
	task: string;
	result: string;
	devYear?: number | null;
	collagePic: string;
	cardPic: string;
	createdat: string;
	updatedat: string;
}

export interface PortfolioState {
	portfolio: IPortfolioWork[] | [];
	portfolioLeft: number;
	portfolioWork: IPortfolioWork;
}

export enum PortfolioActionTypes {
	SET_PORTFOLIO = 'SET_PORTFOLIO',
	SET_PORTFOLIO_LEFT = 'SET_PORTFOLIO_LEFT',
	SET_PORTFOLIO_WORK = 'SET_PORTFOLIO_WORK',
}

interface SetPortfolioAction {
	type: PortfolioActionTypes.SET_PORTFOLIO;
	payload: IPortfolioWork[] | [];
}
interface SetPortfolioLeftAction {
	type: PortfolioActionTypes.SET_PORTFOLIO_LEFT;
	payload: number;
}
interface SetPortfolioWorkAction {
	type: PortfolioActionTypes.SET_PORTFOLIO_WORK;
	payload: IPortfolioWork;
}

export type PortfolioAction =
	| SetPortfolioAction
	| SetPortfolioLeftAction
	| SetPortfolioWorkAction;

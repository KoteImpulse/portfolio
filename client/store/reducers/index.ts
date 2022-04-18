import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { HeaderActionTypes } from '../../types/header';
import {
	IPortfolioWork,
	PortfolioActionTypes,
} from '../../types/portfolioWork';

export interface State {
	server: {
		portfolio: IPortfolioWork[];
		portfolioLeft: number;
		portfolioWork: IPortfolioWork;
	};
	client: {
		isOpen: boolean;
		isLoading: boolean;
		activeTab: number;
		tabIsOpen: boolean;
		language: string;
	};
}

const initialState: State = {
	server: {
		portfolio: [],
		portfolioLeft: 0,
		portfolioWork: {} as IPortfolioWork,
	},
	client: {
		isOpen: false,
		isLoading: false,
		activeTab: 0,
		tabIsOpen: false,
		language: 'ru',
	},
};

export const reducer = (state: State = initialState, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				server: {
					...state.server,
					...action.payload.server,
				},
			};
		case PortfolioActionTypes.SET_PORTFOLIO:
			return {
				...state,
				server: {
					...state.server,
					portfolio: action.payload,
				},
			};
		case PortfolioActionTypes.SET_PORTFOLIO_LEFT:
			return {
				...state,
				server: {
					...state.server,
					portfolioLeft: action.payload,
				},
			};
		case PortfolioActionTypes.SET_PORTFOLIO_WORK:
			return {
				...state,
				server: {
					...state.server,
					portfolioWork: action.payload,
				},
			};
		case HeaderActionTypes.SET_HEADER_OPEN:
			return {
				...state,
				client: {
					...state.client,
					isOpen: true,
				},
			};
		case HeaderActionTypes.SET_HEADER_CLOSE:
			return {
				...state,
				client: {
					...state.client,
					isOpen: false,
					activeTab: 0,
					tabIsOpen: false,
				},
			};
		case HeaderActionTypes.SET_HEADER_LOADING_TRUE:
			return {
				...state,
				client: {
					...state.client,
					isLoading: true,
				},
			};
		case HeaderActionTypes.SET_HEADER_LOADING_FALSE:
			return {
				...state,
				client: {
					...state.client,
					isLoading: false,
				},
			};
		case HeaderActionTypes.SET_ACTIVE_TAB:
			return {
				...state,
				client: {
					...state.client,
					activeTab: action.payload,
				},
			};
		case HeaderActionTypes.SET_TAB_OPEN:
			return {
				...state,
				client: {
					...state.client,
					tabIsOpen: true,
				},
			};
		case HeaderActionTypes.SET_TAB_CLOSE:
			return {
				...state,
				client: {
					...state.client,
					tabIsOpen: false,
				},
			};
		case HeaderActionTypes.SET_LANGUAGE:
			return {
				...state,
				client: {
					...state.client,
					language: action.payload,
				},
			};
		default:
			return state;
	}
};

export type RootState = ReturnType<typeof reducer>;

// const rootReducer = combineReducers({
// 	server: portfolioReducer,
// 	client: headerReducer,
// });
// export const reducer = (state: any, action: any) => {
// 	if (action.type === HYDRATE) {
// 		const nextState = {
// 			...state, // use previous state
// 			...action.payload, // apply delta from hydration
// 		};
// 		if (state.count) nextState.count = state.count;
// 		// preserve count value on client side navigation
// 		return nextState;
// 	} else {
// 		return rootReducer(state, action);
// 	}
// };
// export type RootState = ReturnType<typeof rootReducer>;

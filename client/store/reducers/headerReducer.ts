import {
	HeaderAction,
	HeaderActionTypes,
	HeaderState,
} from '../../types/header';

const initialState: HeaderState = {
	isOpen: false,
	isLoading: false,
	activeTab: 0,
	tabIsOpen: false,
	language: 'ru',
};

export const headerReducer = (
	state = initialState,
	action: HeaderAction
): HeaderState => {
	switch (action.type) {
		case HeaderActionTypes.SET_HEADER_OPEN:
			return { ...state, isOpen: true };
		case HeaderActionTypes.SET_HEADER_CLOSE:
			return { ...state, isOpen: false, activeTab: 0, tabIsOpen: false };
		case HeaderActionTypes.SET_HEADER_LOADING_TRUE:
			return { ...state, isLoading: true };
		case HeaderActionTypes.SET_HEADER_LOADING_FALSE:
			return { ...state, isLoading: false };
		case HeaderActionTypes.SET_ACTIVE_TAB:
			return { ...state, activeTab: action.payload };
		case HeaderActionTypes.SET_TAB_OPEN:
			return { ...state, tabIsOpen: true };
		case HeaderActionTypes.SET_TAB_CLOSE:
			return { ...state, tabIsOpen: false };
		case HeaderActionTypes.SET_LANGUAGE:
			return { ...state, language: action.payload };
		default:
			return state;
	}
};

import { HeaderAction, HeaderActionTypes } from '../../types/header';

export const setHeaderOpen = (): HeaderAction => {
	return { type: HeaderActionTypes.SET_HEADER_OPEN };
};
export const setHeaderClose = (): HeaderAction => {
	return { type: HeaderActionTypes.SET_HEADER_CLOSE };
};
export const setHeaderLoadingTrue = (): HeaderAction => {
	return { type: HeaderActionTypes.SET_HEADER_LOADING_TRUE };
};
export const setHeaderLoadingFalse = (): HeaderAction => {
	return { type: HeaderActionTypes.SET_HEADER_LOADING_FALSE };
};
export const setActiveTab = (payload: number): HeaderAction => {
	return { type: HeaderActionTypes.SET_ACTIVE_TAB, payload };
};
export const setTabOpen = (): HeaderAction => {
	return { type: HeaderActionTypes.SET_TAB_OPEN };
};
export const setTabClose = (): HeaderAction => {
	return { type: HeaderActionTypes.SET_TAB_CLOSE };
};
export const setLanguage = (payload: string): HeaderAction => {
	return { type: HeaderActionTypes.SET_LANGUAGE, payload };
};

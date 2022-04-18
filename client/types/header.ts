export interface HeaderState {
	isOpen: boolean;
	isLoading: boolean;
	activeTab: number;
	tabIsOpen: boolean;
	language: string;
}

export enum HeaderActionTypes {
	SET_HEADER_OPEN = 'SET_HEADER_OPEN',
	SET_HEADER_CLOSE = 'SET_HEADER_CLOSE',
	SET_HEADER_LOADING_TRUE = 'SET_HEADER_LOADING_TRUE',
	SET_HEADER_LOADING_FALSE = 'SET_HEADER_LOADING_FALSE',
	SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
	SET_TAB_OPEN = 'SET_TAB_OPEN',
	SET_TAB_CLOSE = 'SET_TAB_CLOSE',
	SET_LANGUAGE = 'SET_LANGUAGE',
}

interface SetHeaderOpenAction {
	type: HeaderActionTypes.SET_HEADER_OPEN;
}
interface SetHeaderCloseAction {
	type: HeaderActionTypes.SET_HEADER_CLOSE;
}
interface SetHeaderLoadingTrueAction {
	type: HeaderActionTypes.SET_HEADER_LOADING_TRUE;
}
interface SetHeaderLoadingFalseAction {
	type: HeaderActionTypes.SET_HEADER_LOADING_FALSE;
}
interface SetActiveTabAction {
	type: HeaderActionTypes.SET_ACTIVE_TAB;
	payload: number;
}
interface SetTabOpenAction {
	type: HeaderActionTypes.SET_TAB_OPEN;
}
interface SetTabCloseAction {
	type: HeaderActionTypes.SET_TAB_CLOSE;
}
interface SetLanguageAction {
	type: HeaderActionTypes.SET_LANGUAGE;
	payload: string;
}

export type HeaderAction =
	| SetHeaderOpenAction
	| SetHeaderCloseAction
	| SetHeaderLoadingTrueAction
	| SetHeaderLoadingFalseAction
	| SetActiveTabAction
	| SetTabOpenAction
	| SetTabCloseAction
	| SetLanguageAction;

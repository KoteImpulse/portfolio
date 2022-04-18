export interface ITextItem {
	id: number;
	text1: string;
	text2?: string;
}

export interface IMenuTab {
	id: number;
	alias: string;
	title: string;
	link: boolean;
	content?: ITabContent[];
	description?: string;
	header?: string;
}

export interface ITabContent {
	id: number;
	alias: string;
	title: string;
	link: boolean;
}
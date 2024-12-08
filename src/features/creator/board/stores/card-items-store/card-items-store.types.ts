import { type OverrideItemData } from "~/features/creator/board/types/creator-item.types"; // eslint-disable-next-line

// eslint-disable-next-line
export type StageData<T = any> = {
	id: string;
	attrs: OverrideItemData<T>;
	className: string;
	children?: StageData[];
};

export type ItemData = {
	"data-item-type": string;
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	fill: string;
	draggable: boolean;
} & Record<string, unknown>;

export interface CardItemsStoreState {
	stageItems: StageData[];
}

export interface CardItemsStoreActions {
	getItem: (id: string) => StageData | undefined;
	createItem: (newItem: StageData) => void;
	removeItem: (targetItemId: string | string[]) => void;
	updateItem: (id: string, attrsFunc: (attrs: StageData["attrs"]) => StageData["attrs"]) => void;
}

export type CardItemsStore = CardItemsStoreState & CardItemsStoreActions;

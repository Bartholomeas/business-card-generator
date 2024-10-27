import { type OverrideItemData } from "~/features/creator/types/creator-item.types";

export type StageData = {
	id: string;
	// eslint-disable-next-line
	attrs: OverrideItemData<any>;
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
	// createItem: (newItem: StageData) => void;

	updateItem: (id: string, attrsFunc: (attrs: StageData["attrs"]) => StageData["attrs"]) => void;
}

export type CardItemsStore = CardItemsStoreState & CardItemsStoreActions;

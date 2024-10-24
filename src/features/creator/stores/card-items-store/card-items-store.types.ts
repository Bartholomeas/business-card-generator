export type StageData = {
	id: string;
	attrs: OverrideItemData<unknown>;
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

export type OverrideItemData<T> = Omit<ItemData, keyof T> & T;

export interface CardItemsStoreState {
	stageItems: StageData[];
}

export interface CardItemsStoreActions {
	getItem: (id: string) => StageData | undefined;
	// createItem: (newItem: StageData) => void;

	updateItem: (id: string, attrsFunc: (attrs: StageData["attrs"]) => StageData["attrs"]) => void;
}

export type CardItemsStore = CardItemsStoreState & CardItemsStoreActions;

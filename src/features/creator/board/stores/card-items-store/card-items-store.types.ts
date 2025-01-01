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

export type DecorationElementType = "ICON" | "SHAPE" | "IMAGE";

export interface DecorationElement {
	id: string;
	type: DecorationElementType;
	src?: string;
	positionX: number;
	positionY: number;
	width: number;
	height: number;
	rotation?: number;
	scaleX?: number;
	scaleY?: number;
	opacity?: number;
	zIndex?: number;
}

export interface CardItemsStoreState {
	stageItems: StageData[];
	decorationElements: DecorationElement[];
}

export interface CardItemsStore extends CardItemsStoreState {
	// Decoration methods
	addDecoration: (decoration: Omit<DecorationElement, "id">) => void;
	updateDecoration: (id: string, updates: Partial<DecorationElement>) => void;
	removeDecoration: (id: string) => void;

	// Existing Konva methods
	getItem: (id: string) => StageData | undefined;
	createItem: (newItem: StageData) => void;
	updateItem: (id: string, attrsFunc: (attrs: StageData["attrs"]) => StageData["attrs"]) => void;
	removeItem: (targetItemId: string | string[]) => void;
	saveToDatabase: () => Promise<void>;
}

import { type KonvaEventObject } from "konva/lib/Node";

import { type ItemData } from "~/features/creator/stores/card-items-store/card-items-store.types";

import type Konva from "konva";

export interface ItemProps extends Record<string, unknown> {
	key: string;
	data: ItemData;
	e?: Event;
}

export interface ItemHandleActions {
	onSelect: (e?: KonvaEventObject<MouseEvent>, itemList?: Konva.Node[]) => void;
}

export type OverrideItemProps<T> = Omit<ItemProps, keyof T> &
	T &
	Pick<ItemHandleActions, "onSelect">;

export type OverrideItemData<T> = Omit<ItemData, keyof T> & T;

import { create } from "zustand";

import {
	type CardItemsStore,
	type CardItemsStoreState,
	type StageData,
} from "./card-items-store.types";

const initialState: CardItemsStoreState = {
	stageItems: [],
};

export const useCardItemsStore = create<CardItemsStore>((set, get) => {
	return {
		...initialState,

		// Actions
		getItem: (id: string) => get().stageItems.find(item => item.id === id),

		updateItem: (
			id: string,
			attrsFunc: (attrs: StageData["attrs"]) => StageData["attrs"],
		): void => {
			const targetItem = get()?.getItem(id);

			if (!targetItem) return;

			const updatedItem: StageData = {
				...targetItem,
				attrs: {
					...(targetItem?.attrs ?? {}),
					...attrsFunc(targetItem?.attrs),
				},
			};

			console.log("Item Updated:::", id);

			set(state => ({
				...state,
				stageItems: state.stageItems.map(item => (item.id === id ? updatedItem : item)),
			}));
		},
	};
});

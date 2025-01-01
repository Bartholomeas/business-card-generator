import { create } from "zustand";

import {
	type CardItemsStore,
	type CardItemsStoreState,
	type StageData,
} from "./card-items-store.types";
import { initialStageDataList } from "../../stage-data-list.mock";

const initialState: CardItemsStoreState = {
	stageItems: initialStageDataList[0]?.data ?? [],
};

export const useCardItemsStore = create<CardItemsStore>((set, get) => {
	return {
		...initialState,

		// Actions
		getItem: (id: string) => {
			return get().stageItems.find(item => item.id === id);
		},
		createItem: (newItem: StageData) =>
			set(state => ({ stageItems: [...state.stageItems, newItem] })),

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

			set(state => ({
				...state,
				stageItems: state.stageItems.map(item => (item.id === id ? updatedItem : item)),
			}));
		},

		removeItem: (targetItemId: string | string[]) => {
			if (Array.isArray(targetItemId))
				set(state => ({
					stageItems: state.stageItems?.filter(item => !targetItemId.includes(item.id)),
				}));
			else
				set(state => ({ stageItems: state.stageItems?.filter(item => item.id !== targetItemId) }));
		},

		saveToDatabase: async () => {
			const items = get().stageItems;
			console.log("items", items);
			// You'll need to implement this API endpoint
			// await api.card.saveDecorations.mutate({ items });
		},
	};
});

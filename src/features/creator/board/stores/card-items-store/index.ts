import { create } from "zustand";

import {
	type CardItemsStore,
	type CardItemsStoreState,
	type StageData,
} from "./card-items-store.types";
import { initialStageDataList } from "../../stage-data-list.mock";

const initialState: CardItemsStoreState = {
	stageItems: initialStageDataList[0]?.data ?? [],
	decorationElements: [],
};

export const useCardItemsStore = create<CardItemsStore>((set, get) => {
	return {
		...initialState,

		// Decoration methods
		addDecoration: decoration => {
			const id = crypto.randomUUID();
			set(state => ({
				...state,
				decorationElements: [...state.decorationElements, { ...decoration, id }],
			}));
		},

		updateDecoration: (id, updates) => {
			set(state => ({
				...state,
				decorationElements: state.decorationElements.map(elem =>
					elem.id === id ? { ...elem, ...updates } : elem,
				),
			}));
		},

		removeDecoration: id => {
			set(state => ({
				...state,
				decorationElements: state.decorationElements.filter(elem => elem.id !== id),
			}));
		},

		// Existing Konva methods
		getItem: (id: string) => {
			return get().stageItems.find(item => item.id === id);
		},

		createItem: (newItem: StageData) =>
			set(state => ({ ...state, stageItems: [...state.stageItems, newItem] })),

		updateItem: (id, attrsFunc) => {
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
					...state,
					stageItems: state.stageItems?.filter(item => !targetItemId.includes(item.id)),
				}));
			else
				set(state => ({
					...state,
					stageItems: state.stageItems?.filter(item => item.id !== targetItemId),
				}));
		},

		saveToDatabase: async () => {
			const { stageItems, decorationElements } = get();
			// Implement API call to save both
			console.log("Saving to database:", { stageItems, decorationElements });
		},
	};
});

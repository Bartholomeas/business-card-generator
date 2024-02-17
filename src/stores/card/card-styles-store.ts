import { create } from "zustand";
import { type CardStylesReducerState } from "~/components/panel/card-wizard/card-styles-handler/hooks/types";

export interface CardStylesActions {
  toggleTextHide: () => void;
}

export type CardStylesStore = CardStylesActions & CardStylesReducerState;

export const initialState: CardStylesReducerState = {
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  theme: "templateDefault",
  generalStyles: {},
  defaultTextElements: undefined,
  qrLink: null,
};

// export const createCardStore = (initState: CardStylesReducerState = initialState) => {
//   return createStore<CardStylesStore>()(set => ({
//     ...initState,
//     toggleTextHide: () => set(state => ({ ...state })),
//   }));
// };

export const useCardStore = create<CardStylesStore>()((set, get) => ({
  ...initialState,
  toggleTextHide: () => set({ qrLink: "ss" }),
  getTest: () => get().qrLink,
}));

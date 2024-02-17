import { createStore } from "zustand";

import { type MappedDefaultTextElements } from "~/misc/utils/misc";
import { type BusinessCardThemeCodes, type BusinessCard } from "~/server/api/routers/card";

export interface CardStylesStoreState {
  generalStyles: BusinessCard["generalStyles"] | undefined;
  defaultTextElements: MappedDefaultTextElements | undefined;
  front: BusinessCard["front"] | undefined;
  back: BusinessCard["back"] | undefined;
  qrLink?: BusinessCard["qrLink"];
  theme?: BusinessCardThemeCodes;
}

export interface CardStylesActions {
  decrementCount: () => void;
}

export type CardStylesStore = CardStylesActions & CardStylesStoreState;

export const defaultInitState: CardStylesStoreState = {
  front: { id: "front", styles: {}, textElements: [] },
  back: { id: "back", styles: {}, textElements: [] },
  theme: "templateDefault",
  generalStyles: {},
  defaultTextElements: undefined,
  qrLink: null,
};

export const createCardStylesStore = (initState: CardStylesStoreState = defaultInitState) => {
  return createStore<CardStylesStore>()(set => ({
    ...initState,
    decrementCount: () => set(state => state),
  }));
};

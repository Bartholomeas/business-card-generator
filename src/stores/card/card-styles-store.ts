import { createStore } from "zustand";
import { type TextElementsHidden } from "~/components/panel/card-wizard/edit-styles/helpers";
import { type MappedDefaultTextElements } from "~/misc/utils/misc";
import { type BusinessCardThemeCodes, type BusinessCard } from "~/server/api/routers/card";
import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

export interface CardStylesStoreState {
  generalStyles: BusinessCard["generalStyles"] | undefined;
  defaultTextElements: MappedDefaultTextElements | undefined;
  front: BusinessCard["front"] | undefined;
  back: BusinessCard["back"] | undefined;
  qrLink?: BusinessCard["qrLink"];
  theme?: BusinessCardThemeCodes;
}

export interface CardStylesActions {
  getTextElementByCode: (code: TextElementCodes | undefined) => TextElement;
  toggleTextElementHide: (data: TextElementsHidden) => void;
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
  return createStore<CardStylesStore>()((set, get) => ({
    ...initState,

    // Actions
    getTextElementByCode: (code: TextElementCodes | undefined): TextElement => {
      if (!code) return DefaultTextElement as TextElement;

      const { defaultTextElements } = get();

      return defaultTextElements?.[code] ?? (DefaultTextElement as TextElement);
    },
    toggleTextElementHide: (data: TextElementsHidden) => {
      const { defaultTextElements } = get();

      const updatedTextElements = Object.entries(data).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key as TextElementCodes]: {
            ...defaultTextElements?.[key as TextElementCodes],
            isHidden: !value,
          },
        }),
        {},
      );

      return set(state => ({
        ...state,
        defaultTextElements: updatedTextElements,
      }));
    },
  }));
};

export const DefaultTextElement: Partial<TextElement> = {
  id: undefined,
  text: undefined,

  code: undefined,

  positionX: undefined,
  positionY: undefined,

  color: undefined,

  fontSize: undefined,
  fontFamily: undefined,
  fontWeight: undefined,
  fontStyle: undefined,

  textDecoration: undefined,
  textAlign: undefined,
  lineHeight: undefined,
  letterSpacing: undefined,

  isHidden: true,

  zIndex: undefined,
};

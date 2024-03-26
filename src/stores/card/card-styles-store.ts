import { createStore } from "zustand";
import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";
import { type TextElementsHidden } from "~/components/panel/card-wizard/edit-styles/helpers";
import {
  type CardStylesStore,
  type CardStylesStoreState,
  DefaultTextElement,
  defaultInitState,
} from "./helpers";
import { parseObjectNullsToUndefined } from "~/utils";

/**
 * Creates a card styles store using Zustand.
 *
 * @param initState - The initial state of the card styles store.
 * @returns A Zustand store object with actions and state for managing card styles.
 */
export const createCardStylesStore = (initState: CardStylesStoreState = defaultInitState) => {
  return createStore<CardStylesStore>()((set, get) => ({
    ...initState,

    // Actions
    getChoosenElement: (): TextElement | undefined => get().choosenElement,
    getTextElementByCode: (code: TextElementCodes | undefined): TextElement => {
      if (!code) return DefaultTextElement as TextElement;

      const { defaultTextElements } = get();

      return defaultTextElements?.[code] ?? (DefaultTextElement as TextElement);
    },
    setChoosenElement: (id: string | undefined): void => {
      const { defaultTextElements } = get();
      const element = defaultTextElements
        ? parseObjectNullsToUndefined(Object.values(defaultTextElements).find(el => el.id === id))
        : undefined;
      set(state => ({
        ...state,
        choosenElement: element,
      }));
    },
    toggleTextElementHide: (data: TextElementsHidden): void => {
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

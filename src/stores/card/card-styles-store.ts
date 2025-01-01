import { createStore } from "zustand";

import { objectsAreEqual, parseObjectUndefinedToNulls } from "~/utils";

import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

import { type TextElementsHidden } from "~/components/panel/card-wizard/edit-styles/helpers";

import {
	type CardStylesActions,
	type CardStylesStoreState,
	defaultInitState,
	DefaultTextElement,
} from "./card-styles.helpers";

/**
 * Creates a card styles store using Zustand.
 *
 * @param initState - The initial state of the card styles store.
 * @returns A Zustand store object with actions and state for managing card styles.
 */

export type CardStylesStore = CardStylesActions & CardStylesStoreState;
export const createCardStylesStore = (initState: CardStylesStoreState = defaultInitState) => {
	return createStore<CardStylesStore>()((set, get) => ({
		...initState,
		decorationElements: [],

		// Actions
		getChosenElement: (): TextElement | undefined => get().chosenElement,
		getTextElementByCode: (code: TextElementCodes | undefined): TextElement => {
			if (!code) return DefaultTextElement as TextElement;

			const { defaultTextElements } = get();

			return defaultTextElements?.[code] ?? (DefaultTextElement as TextElement);
		},
		getIsDirty: (): boolean => get().isDirty ?? false,
		setStateClear: () => set(state => ({ ...state, isDirty: false })),
		setChosenElement: (id: string | undefined): void => {
			const { defaultTextElements } = get();

			const element = defaultTextElements
				? Object.values(defaultTextElements).find(el => el.id === id)
				: undefined;

			set(state => ({
				...state,
				chosenElement: element,
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
				isDirty: true,
				defaultTextElements: updatedTextElements,
			}));
		},

		changeTextElement: (textEl: Partial<TextElement>): void => {
			if (!textEl) return;
			const element = get().chosenElement;
			const updatedElement = { ...element, ...parseObjectUndefinedToNulls(textEl) } as TextElement;

			set(state => {
				const { defaultTextElements } = state;

				if (defaultTextElements && textEl.code) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					if (objectsAreEqual(updatedElement, defaultTextElements[textEl.code]))
						return {
							...state,
							defaultTextElements,
						};

					defaultTextElements[textEl.code] = updatedElement;
				}
				return {
					...state,
					isDirty: true,
					defaultTextElements,
				};
			});
		},

		addDecoration: decoration => {
			const id = crypto.randomUUID();
			console.log("ADD DECORATION::: ", decoration);
			set(state => ({
				...state,
				isDirty: true,
				decorationElements: [...state.decorationElements, { ...decoration, id }],
			}));
		},

		updateDecoration: (id, updates) => {
			set(state => ({
				...state,
				isDirty: true,
				decorationElements: state.decorationElements.map(elem =>
					elem.id === id ? { ...elem, ...updates } : elem,
				),
			}));
		},

		removeDecoration: id => {
			set(state => ({
				...state,
				isDirty: true,
				decorationElements: state.decorationElements.filter(elem => elem.id !== id),
			}));
		},
	}));
};

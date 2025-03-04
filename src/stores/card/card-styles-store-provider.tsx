"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";

import { type StoreApi, useStore } from "zustand";

import { mapDefaultTextsToObjects } from "~/utils/misc";

import { type BusinessCard } from "~/server/api/routers/card";

import { type CardStylesStore, createCardStylesStore } from "./card-styles-store";
import { type CardStylesStoreState, defaultInitState } from "./card-styles.helpers";

export const CardStylesStoreContext = createContext<StoreApi<CardStylesStore> | null>(null);

export interface CardStylesStoreProviderProps {
  card?: BusinessCard;
  children: ReactNode;
}

/**
 * @description Provider of Zustand business card store.
 * @param {BusinessCard} card - Current card passed to Zustand store as a reference
 * @param {ReactNode} children
 * @constructor
 */
export const CardStylesStoreProvider = ({ card, children }: CardStylesStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CardStylesStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCardStylesStore(getInitialState(card));
  }

  return (
    <CardStylesStoreContext.Provider value={storeRef.current}>
      {children}
    </CardStylesStoreContext.Provider>
  );
};

// Hooks to handle card store
const useCardStylesStoreContext = <T,>(selector: (store: CardStylesStore) => T): T => {
  const context = useContext(CardStylesStoreContext);

  if (!context) throw new Error("useCardStylesStore must be used within CardStylesStoreProvider");

  return useStore(context, selector);
};

export const useCardStylesStore = () => useCardStylesStoreContext(state => state);

const getInitialState = (card: BusinessCard | undefined): CardStylesStoreState => {
  const defaultTextElements = mapDefaultTextsToObjects(card?.defaultTextElements);

  return {
    decorationElements: [],
    generalStyles: card?.generalStyles ?? defaultInitState.generalStyles,
    defaultTextElements: defaultTextElements ?? defaultInitState.defaultTextElements,
    front: card?.front ?? defaultInitState.front,
    back: card?.back ?? defaultInitState.back,
    theme: defaultInitState.theme,
    qrLink: card?.qrLink ?? defaultInitState.qrLink,
    chosenElement: undefined,
    isDirty: false,
  };
};

"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore, type StoreApi } from "zustand";
import { type CardStylesStore, createCardStylesStore } from "./provider-store";
import { type BusinessCard } from "~/server/api/routers/card";

export const CardStylesStoreContext = createContext<StoreApi<CardStylesStore> | null>(null);

export interface CardStylesStoreProviderProps {
  card?: BusinessCard;
  children: ReactNode;
}

export const CardStylesStoreProvider = ({ children }: CardStylesStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CardStylesStore>>();
  if (!storeRef.current) {
    storeRef.current = createCardStylesStore();
  }

  return (
    <CardStylesStoreContext.Provider value={storeRef.current}>
      {children}
    </CardStylesStoreContext.Provider>
  );
};

export const useCardStylesStore = <T,>(selector: (store: CardStylesStore) => T): T => {
  const context = useContext(CardStylesStoreContext);

  if (!context) {
    throw new Error(`useCardStylesStore must be use within CardStylesStoreProvider`);
  }

  return useStore(context, selector);
};

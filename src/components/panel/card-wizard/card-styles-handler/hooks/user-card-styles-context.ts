"use client";

import { type Dispatch, createContext, useContext } from "react";
import { type ReducerActions, type CardStylesReducerState } from "./types";
import { type BusinessCardThemeCodes } from "~/server/api/routers/card";

interface CardStylesContextProps {
  state: CardStylesReducerState | undefined;
  dispatch: Dispatch<ReducerActions>;
}

export const CardStylesContext = createContext<CardStylesContextProps>({
  state: undefined,
  dispatch: () => null,
});

export const useCardStylesContext = () => {
  const context = useContext(CardStylesContext);

  if (!context)
    throw new Error("useCardStylesContext must be used within a <CardStylesContext.Provider/>");

  return context;
};

"use client";

import { createContext, useContext } from "react";
import { type BusinessCard } from "~/server/api/routers/user/requests";

interface CardStylesContextProps {
  card: BusinessCard | undefined;
  generalStyles: BusinessCard["generalStyles"] | undefined;
  front: BusinessCard["front"] | undefined;
  back: BusinessCard["back"] | undefined;
  qrLink: BusinessCard["qrLink"] | undefined;
}

export const CardStylesContext = createContext<CardStylesContextProps>({
  card: undefined,

  generalStyles: undefined,

  front: undefined,
  back: undefined,

  qrLink: undefined,
});

const useCardStylesContext = () => {
  const context = useContext(CardStylesContext);

  if (!context)
    throw new Error(
      "useCardStylesContext must be used within a <CardStylesContext.Provider/>",
    );

  return context;
};
export default useCardStylesContext;

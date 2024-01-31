"use client";

import React from "react";
import { CardStylesContext, useCardStyles } from "./hooks";
import { type BusinessCard } from "~/server/api/routers/card";

interface CardStylesHandlerProps {
  card: BusinessCard | undefined;
  children?: React.ReactNode;
}

export const CardStylesHandler = ({ card, children }: CardStylesHandlerProps) => {
  const { state, dispatch } = useCardStyles(card);

  return (
    <CardStylesContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CardStylesContext.Provider>
  );
};

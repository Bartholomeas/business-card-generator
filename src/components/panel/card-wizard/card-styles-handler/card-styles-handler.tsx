"use client";

import React from "react";
import { type BusinessCard } from "~/server/api/routers/user/requests";
import { CardStylesContext, useCardStyles } from "./hooks";

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

"use client";

import React from "react";

import { type BusinessCard } from "~/server/api/routers/user/requests";
import { CardStylesContext } from "./hooks/useCardStylesContext";
import useCardStyles from "./hooks/useCardStyles";

interface CardStylesHandlerProps {
  card: BusinessCard | undefined;
  children?: React.ReactNode;
}

const CardStylesHandler = ({ card, children }: CardStylesHandlerProps) => {
  const { state, dispatch } = useCardStyles(card);
  console.log({ state });
  return (
    <CardStylesContext.Provider
      value={{
        card,
        generalStyles: card?.generalStyles,
        front: card?.front,
        back: card?.back,
        qrLink: card?.qrLink,
      }}
    >
      {children}
    </CardStylesContext.Provider>
  );
};

export default CardStylesHandler;

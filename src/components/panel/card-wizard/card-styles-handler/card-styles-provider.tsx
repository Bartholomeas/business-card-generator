import React from "react";

import { CardStylesHandler } from "./card-styles-handler";
import { type BusinessCard } from "~/server/api/routers/card";

interface CardStylesProviderProps {
  children?: React.ReactNode;
  card: BusinessCard;
}

export const CardStylesProvider = ({ card, children }: CardStylesProviderProps) => {
  return <CardStylesHandler card={card}>{children}</CardStylesHandler>;
};

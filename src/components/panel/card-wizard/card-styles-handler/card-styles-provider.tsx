import React from "react";

import { type BusinessCard } from "~/server/api/routers/user/requests";
import { CardStylesHandler } from "./card-styles-handler";

interface CardStylesProviderProps {
  children?: React.ReactNode;
  card: BusinessCard;
}

export const CardStylesProvider = ({ card, children }: CardStylesProviderProps) => {
  return <CardStylesHandler card={card}>{children}</CardStylesHandler>;
};

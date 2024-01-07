import React from "react";
import CardStylesHandler from "./card-styles-handler";
import { type BusinessCard } from "~/server/api/routers/user/requests";

interface CardStylesProviderProps {
  children?: React.ReactNode;
  card: BusinessCard;
}

const CardStylesProvider = ({ card, children }: CardStylesProviderProps) => {
  return <CardStylesHandler card={card}>{children}</CardStylesHandler>;
};
export default CardStylesProvider;

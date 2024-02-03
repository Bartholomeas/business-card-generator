"use client";

import { type ComponentProps } from "react";
import { type Company } from "@prisma/client";

import { CardTemplateDefault, CardTemplateFutura } from "../card-theme-templates";
import { useCardStylesContext } from "../card-styles-handler/hooks";

import { type WithFlipProps } from "~/components/common/special";
import { type BusinessCardThemeCodes, type BusinessCard } from "~/server/api/routers/card";

export interface CardTemplateProps extends WithFlipProps {
  card?: BusinessCard;
  company?: Company;
  className?: ComponentProps<"div">["className"];
}

export const FlippableCardHandler = ({ variant = "front", ...props }: CardTemplateProps) => {
  const { state } = useCardStylesContext();

  const Component = getComponentByTheme(state?.theme);

  switch (variant) {
    case "front":
      return <Component.front {...props} />;
    case "back":
      return <Component.back {...props} />;
    default:
      return <Component.front {...props} />;
  }
};

const getComponentByTheme = (code: BusinessCardThemeCodes | undefined) => {
  switch (code) {
    case "templateDefault":
      return CardTemplateDefault;
    case "templateFutura":
      return CardTemplateFutura;
    default:
      return CardTemplateDefault;
  }
};

"use client";

import { type ComponentProps } from "react";

import { type Company } from "@prisma/client";

import { type BusinessCard, type BusinessCardThemeCodes } from "~/server/api/routers/card";

import { type WithFlipProps } from "~/components/special/with-flip/with-flip.types";

import { CardTemplateDefault, CardTemplateFutura } from "../card-theme-templates";

import { useCardStylesStore } from "~/stores/card";


export interface CardTemplateProps extends WithFlipProps {
	card?: BusinessCard;
	company?: Company;
	className?: ComponentProps<"div">["className"];
}

export const FlippableCardHandler = ({ variant = "front", ...props }: CardTemplateProps) => {
	const { theme } = useCardStylesStore();
	const CardElement = getCardElementByThemeCode(theme);

	switch (variant) {
		case "front":
			return <CardElement.front {...props} />;
		case "back":
			return <CardElement.back {...props} />;
		default:
			return <CardElement.front {...props} />;
	}
};

const getCardElementByThemeCode = (code: BusinessCardThemeCodes | undefined) => {
	switch (code) {
		case "templateDefault":
			return CardTemplateDefault;
		case "templateFutura":
			return CardTemplateFutura;
		default:
			return CardTemplateDefault;
	}
};

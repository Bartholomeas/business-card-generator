import { type BusinessCard as BusinessCardModel } from "@prisma/client";

import { type TextElement } from "../user";

interface BusinessCardConfig {
	id: string;
	styles: Record<string, string | number>;
	textElements?: TextElement[];
}

export interface BusinessCard
	extends Omit<BusinessCardModel, "userId" | "user" | "frontId" | "backId"> {
	front: BusinessCardConfig;
	back: BusinessCardConfig;
	generalStyles: Record<string, string | number>;
	defaultTextElements?: TextElement[];
	qrLink: string | null;
}

export type BusinessCardThemeCodes = "templateDefault" | "templateFutura" | "templateRedDot";

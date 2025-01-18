import {
	initializeCard,
	getCardThemes,
	getCompanyBusinessCard,
	getUserBusinessCard,
	getAllCards,
	toggleTextElementHide,
	updateTextElement,
	updateDecorations,
} from "./requests";
import { createTRPCRouter } from "../../trpc";
import { createCompanyBusinessCard } from "./requests/create-company-business-card";

export const cardRouter = createTRPCRouter({
	initializeCard,
	getUserBusinessCard,
	getCompanyBusinessCard,
	getAllCards,
	getCardThemes,
	updateTextElement,
	toggleTextElementHide,
	updateDecorations,
	createCompanyBusinessCard,
});

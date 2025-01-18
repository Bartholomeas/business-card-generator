import {
	getCardThemes,
	getCompanyBusinessCard,
	getUserBusinessCard,
	getAllCards,
	toggleTextElementHide,
	updateTextElement,
	updateDecorations,
} from "./requests";
import { createTRPCRouter } from "../../trpc";

export const cardRouter = createTRPCRouter({
	getUserBusinessCard,
	getCompanyBusinessCard,
	getAllCards,
	getCardThemes,
	updateTextElement,
	toggleTextElementHide,
	updateDecorations,
});

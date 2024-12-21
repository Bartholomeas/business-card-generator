import {
	getCardThemes,
	getCompanyBusinessCard,
	getUserBusinessCard,
	getAllCards,
	toggleTextElementHide,
	updateTextElement,
} from "./requests";
import { createTRPCRouter } from "../../trpc";

export const cardRouter = createTRPCRouter({
	getUserBusinessCard,
	getCompanyBusinessCard,
	getAllCards,
	getCardThemes,
	updateTextElement,
	toggleTextElementHide,
});

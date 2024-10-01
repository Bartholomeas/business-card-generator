import {
	getCardThemes,
	getCompanyBusinessCard,
	getUserBusinessCard,
	toggleTextElementHide,
	updateTextElement,
} from "./requests";
import { createTRPCRouter } from "../../trpc";

export const cardRouter = createTRPCRouter({
	getUserBusinessCard,
	getCompanyBusinessCard,
	getCardThemes,
	updateTextElement,
	toggleTextElementHide,
});

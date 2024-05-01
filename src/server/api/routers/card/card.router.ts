import { createTRPCRouter } from "../../trpc";
import {
  getCardThemes,
  getCompanyBusinessCard,
  getUserBusinessCard,
  toggleTextElementHide,
  updateTextElement,
} from "./requests";

export const cardRouter = createTRPCRouter({
  getUserBusinessCard,
  getCompanyBusinessCard,
  getCardThemes,
  updateTextElement,
  toggleTextElementHide,
});
import { createTRPCRouter } from "../../trpc";
import {
  getCardThemes,
  getCompanyBusinessCard,
  getUserBusinessCard,
  toggleTextElementHide,
  updateGeneralStyles,
  updateTextElement,
} from "./requests";

export const cardRouter = createTRPCRouter({
  getUserBusinessCard,
  getCompanyBusinessCard,
  getCardThemes,
  updateGeneralStyles,
  updateTextElement,
  toggleTextElementHide,
});
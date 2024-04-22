import { createTRPCRouter } from "../../trpc";
import {
  getBusinessCard,
  getCardThemes,
  getUserBusinessCard,
  toggleTextElementHide,
  updateGeneralStyles,
  updateTextElement,
} from "./requests";

export const cardRouter = createTRPCRouter({
  getUserBusinessCard,
  getBusinessCard,
  getCardThemes,
  updateGeneralStyles,
  updateTextElement,
  toggleTextElementHide,
});
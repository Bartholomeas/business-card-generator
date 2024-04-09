import { createTRPCRouter } from "../../trpc";
import {
  getBusinessCard,
  getCardThemes,
  toggleTextElementHide,
  updateGeneralStyles,
  updateTextElement,
} from "./requests";

export const cardRouter = createTRPCRouter({
  getBusinessCard,
  getCardThemes,
  updateGeneralStyles,
  updateTextElement,
  toggleTextElementHide,
});
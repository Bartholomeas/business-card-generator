import { createTRPCRouter } from "../../trpc";
import { getBusinessCard, getCardThemes, updateGeneralStyles, updateTextElement } from "./requests";

export const cardRouter = createTRPCRouter({
  getBusinessCard,
  getCardThemes,
  updateGeneralStyles,
  updateTextElement,
});

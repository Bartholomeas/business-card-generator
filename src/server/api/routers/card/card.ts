import { createTRPCRouter } from "../../trpc";
import { updateGeneralStyles, updateTextElement, getBusinessCard, getCardThemes } from "./requests";

export const cardRouter = createTRPCRouter({
  getBusinessCard,
  getCardThemes,
  updateGeneralStyles,
  updateTextElement,
});

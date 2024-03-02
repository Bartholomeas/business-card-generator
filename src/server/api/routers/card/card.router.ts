import { createTRPCRouter } from "../../trpc";
import { updateGeneralStyles, getBusinessCard, getCardThemes } from "./requests";

export const cardRouter = createTRPCRouter({
  updateGeneralStyles,
  getBusinessCard,
  getCardThemes,
});

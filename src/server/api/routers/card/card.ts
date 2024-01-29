import { createTRPCRouter } from "../../trpc";
import { updateGeneralStyles, getBusinessCard } from "./requests";

export const cardRouter = createTRPCRouter({
  updateGeneralStyles,
  getBusinessCard,
});

import { createTRPCRouter } from "../../trpc";
import { updateGeneralStyles } from "./requests";

export const cardRouter = createTRPCRouter({
  updateGeneralStyles,
});

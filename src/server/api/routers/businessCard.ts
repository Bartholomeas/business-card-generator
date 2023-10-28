import { createTRPCRouter, publicProcedure } from "../trpc";

export const businessCardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.businessCard.findMany();
  }),
});

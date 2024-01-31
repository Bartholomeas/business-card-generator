import { type BusinessCardTheme } from "@prisma/client";
import { publicProcedure } from "~/server/api/trpc";

export const getCardThemes = publicProcedure.query(
  async ({ ctx }): Promise<BusinessCardTheme[]> => await ctx.db.businessCardTheme.findMany(),
);

import { type BusinessCardTheme } from "@prisma/client";
import { publicProcedure } from "~/server/api/trpc";

export const getCardThemes = publicProcedure.query(
  async ({ ctx }): Promise<BusinessCardTheme[]> => {
    try {
      return await ctx.db.businessCardTheme.findMany();
    } catch (err) {
      return [];
    }
  },
);

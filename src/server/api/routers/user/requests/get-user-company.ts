import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import type { Company } from "~/server/api/routers/user";

export const getUserCompany = protectedProcedure.query(
  async ({ ctx }): Promise<Company | undefined> => {
    const { id } = ctx.session.user;

    const company = await ctx.db.company.findFirst({
      where: {
        userId: id,
      },
    });

    if (!company)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie mogliśmy znaleźć firmy przypisanej do tego użytkownika.",
      });

    return company;
  },
);
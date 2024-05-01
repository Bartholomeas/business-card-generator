import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import type { Company } from "~/server/api/routers/company";

export const getUserCompany = protectedProcedure.query(
  async ({ ctx }): Promise<Company | undefined> => {
    const { id } = ctx.session.user;
    try {
      const companyResult = await ctx.db.userDetails.findFirst({
        where: {
          userId: id,
        },
        select: {
          company: {
            select: {
              company: true,
            },
          },
        },
      });
      const company = companyResult?.company?.[0]?.company;
      if (!company)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie mogliśmy znaleźć firmy przypisanej do tego użytkownika.",
        });

      return company;
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      else
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Wystąpił nieznany błąd.",
        });
    }
  },
);
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";
import { userCompanySchema } from "~/server/api/routers/user/company.schemas";

export const updateUserCompany = protectedProcedure
  .input(userCompanySchema)
  .mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;

    if (!input.companyName)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nazwa firmy nie może być pusta.",
      });

    try {
      const userDetails = await ctx.db.userDetails.findFirst({
        where: {
          userId: id,
        },
      });

      if (!userDetails?.id)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono szczegółów użytkownika.",
        });

      return await ctx.db.company.update({
        where: {
          userId: userDetails.id,
        },
        data: input,
      });
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      return Promise.reject(new Error(JSON.stringify(err)).message);
    }
  });
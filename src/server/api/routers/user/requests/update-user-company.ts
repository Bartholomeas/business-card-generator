import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";
import { userCompanySchema } from "~/server/api/routers/company/company.schemas";

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
      const company = await ctx.db.company.findFirst({
        where: {
          usersDetails: {
            userDetails: {
              userId: id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      return await ctx.db.company.update({
        where: {
          id: company?.id,
        },
        data: {
          ...input,
          slug: slugify(input.companyName, {
            lower: true,
            strict: true,
          }),
        },
      });
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      return Promise.reject(new Error(JSON.stringify(err)).message);
    }
  });

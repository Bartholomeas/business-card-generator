import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";

export const getCompanyPageBySlug = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ ctx, input: { slug } }) => {
    try {
      const { isPublished } = (await ctx.db.company.findFirst({
        where: { slug },
        select: {
          isPublished: true,
        },
      })) ?? { isPublished: false };

      const companyPage = await ctx.db.companyPage.findFirst({
        where: { slug },
        select: {
          company: {
            select: {
              companyName: true,
            },
          },
          id: true,
          sections: {
            select: {
              id: true,
              sectionType: true,
            },
          },
        },
      });

      if (isPublished) return companyPage;
      else
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono strony dla tej firmy.",
        });
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
    }
  });
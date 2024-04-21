import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";

export const getCompanyPageBySlug = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ ctx, input: { slug } }) => {
    try {
      const company = await ctx.db.company.findFirst({
        where: { slug },
        include: {
          businessCard: {
            include: {
              front: true,
              back: true,
            },
          },
        },
      });
      if (company?.isPublished) return company;
      else
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono firmy.",
        });
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
    }
  });
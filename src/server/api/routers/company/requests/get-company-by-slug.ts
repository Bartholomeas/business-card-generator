import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import { type Company } from "~/server/api/routers/user";

export const getCompanyBySlug = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ ctx, input: { slug } }): Promise<Company | undefined> => {
    try {
      const company = await ctx.db.company.findFirst({
        where: { slug },
      });
      if (company?.isPublished) return company ?? undefined;
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
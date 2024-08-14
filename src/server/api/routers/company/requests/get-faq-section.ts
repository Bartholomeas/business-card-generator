import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";

export const getFaqSection = publicProcedure
  .input(z.object({ id: z.string().optional() }))
  .query(async ({ ctx, input: { id } }) => {
    try {
      const section = await ctx.db.companyPageSection.findUnique({
        where: {
          id,
        },
        // include: {
        //   faqSection: true,
        // },
        select: {
          faqSection: {
            select: {
              title: true,
              items: true,
            },

            // include: {
            //   items: true,
            // },
          },
        },
      });
      if (!section)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono sekcji FAQ.",
        });
      return section?.faqSection ?? undefined;
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
    }
  });

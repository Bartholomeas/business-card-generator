import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { type Company } from "@prisma/client";
import { publicProcedure } from "~/server/api/trpc";
import { type BusinessCard } from "~/server/api/routers/card";

export const getCompanyPageBySlug = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ ctx, input: { slug } }) => {
    try {
      const company = await ctx.db.company.findFirst({
        where: { slug },
        include: {
          businessCard: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              generalStyles: true,
              defaultTextElements: true,
              back: {
                select: {
                  id: true,
                  styles: true,
                  textElements: true,
                },
              },
              front: {
                select: {
                  id: true,
                  styles: true,
                  textElements: true,
                },
              },
              qrLink: true,
            },
          },
        },
      });
      if (company?.isPublished)
        return company as unknown as Company & {
          businessCard: BusinessCard;
        };
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
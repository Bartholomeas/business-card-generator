import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import type { BusinessCard } from "~/server/api/routers/card";

export const getBusinessCard = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input: { id } }): Promise<BusinessCard | undefined> => {
    try {
      const businessCard = await ctx.db.businessCard.findFirst({
        where: {
          id,
        },
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
      });

      if (!businessCard)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie mogliśmy znaleźć wizytówki.",
        });

      return businessCard as unknown as BusinessCard;
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      else
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Wystąpił nieznany błąd.",
        });
    }
  });
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";

export const businessCardSchema = z.object({});

type BusinessCard = z.infer<typeof businessCardSchema>;

export const getBusinessCard = protectedProcedure.query(
  async ({ ctx }): Promise<BusinessCard> => {
    const { id } = ctx.session.user;

    if (!id)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Błąd, nie mogliśmy znaleźć zalogowanego użytkownika.",
      });

    const card = await ctx.db.user.findFirst({
      where: {
        id,
      },
      select: {
        userDetails: {
          select: {
            cards: {
              include: {
                front: true,
                back: true,
              },
            },
          },
        },
      },
    });

    return card ?? {};
  },
);

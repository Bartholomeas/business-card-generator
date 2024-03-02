import { TRPCError } from "@trpc/server";

import { type BusinessCard } from "../card.types";
import { protectedProcedure } from "~/server/api/trpc";

export const getBusinessCard = protectedProcedure.query(async ({ ctx }): Promise<BusinessCard> => {
  const { id, email } = ctx.session.user;

  const user = await ctx.db.user.findFirst({
    where: {
      OR: [{ id }, { email: email ?? undefined }],
    },
    select: {
      userDetails: {
        select: {
          cards: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              generalStyles: true,
              defaultTextElements: true,
              qrLink: true,
              front: {
                select: {
                  id: true,
                  styles: true,
                  textElements: true,
                },
              },
              back: {
                select: {
                  id: true,
                  styles: true,
                  textElements: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Nie mogliśmy znaleźć użytkownika.",
    });

  const { cards } = user?.userDetails as unknown as {
    cards: BusinessCard;
  };

  return cards;
});

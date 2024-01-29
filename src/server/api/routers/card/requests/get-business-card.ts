import { TRPCError } from "@trpc/server";
import { type BusinessCard as BusinessCardModel } from "@prisma/client";
import { protectedProcedure } from "../../../trpc";
import { type TextElement } from "../../user/requests/types";

interface BusinessCardConfig {
  id: string;
  styles: Record<string, string | number>;
  textElements?: TextElement[];
}
export interface BusinessCard
  extends Omit<BusinessCardModel, "userId" | "user" | "frontId" | "backId"> {
  front: BusinessCardConfig;
  back: BusinessCardConfig;
  generalStyles: Record<string, string | number>;
  qrLink: string | null;
}

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

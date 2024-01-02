import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { type BusinessCard as BusinessCardModel } from "@prisma/client";
import { protectedProcedure } from "../../../trpc";

export const businessCardSchema = z.object({});

export type BusinessCard = Omit<
  BusinessCardModel,
  "userId" | "user" | "frontId" | "backId"
>;

export const getBusinessCard = protectedProcedure.query(
  async ({ ctx }): Promise<BusinessCard> => {
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
                  },
                },
                back: {
                  select: {
                    id: true,
                    styles: true,
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
  },
);

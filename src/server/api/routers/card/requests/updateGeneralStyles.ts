import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

const updateGeneralStylesSchema = z.object({
  fontSize: z.number().min(1).default(16),
});

export const updateGeneralStyles = protectedProcedure
  .input(updateGeneralStylesSchema)
  .mutation(async ({ ctx, input }) => {
    const { email, id } = ctx.session.user;
    console.log({ id });
    const card =
      email &&
      (await ctx.db.businessCard.update({
        where: { userId: id },
        data: {
          generalStyles: input,
        },
      }));

    if (!card)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie znaleziono karty.",
      });

    return card;
  });

import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

const updateGeneralStylesSchema = z.object({
  fontSize: z.number().min(1).default(16),
});

export const updateGeneralStyles = protectedProcedure
  .input(updateGeneralStylesSchema)
  .mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;

    const generalCardStyles = await ctx.db.businessCard.findUnique({
      where: { userId: id },
      select: {
        generalStyles: true,
      },
    });

    return generalCardStyles;
  });

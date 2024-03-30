import { z } from "zod";
import { TextElementConfigSchema } from "~/components/panel/card-wizard/edit-styles/helpers";
import { protectedProcedure } from "~/server/api/trpc";

const TextElementInputSchema = z.intersection(
  TextElementConfigSchema,
  z.object({ id: z.string().optional() }),
);
export const updateTextElement = protectedProcedure
  .input(TextElementInputSchema)
  .mutation(async ({ ctx, input }) => {
    // const { id } = ctx.session.user;

    const card = await ctx.db.textElement.findUnique({
      where: { id: input.id },
    });

    // await ctx.db.textElement.update({
    //   where: {
    //     id,
    //   },
    //   data: { ...card, ...input },
    // });
    console.log({ ...card, ...input });

    return card;
  });

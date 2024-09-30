import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import { errorMessages } from "~/utils/errors";

const toggleTextElementHidePayloadSchema = z.object({
  id: z.string(),
  isHidden: z.boolean(),
});

export const toggleTextElementHide = protectedProcedure
  .input(toggleTextElementHidePayloadSchema)
  .mutation(async ({ ctx, input: { id, isHidden } }) => {
    const { id: userId } = ctx.session.user;
    if (!userId)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: errorMessages.userNotFound,
      });
    try {
      await ctx.db.textElement.update({
        where: {
          id,
        },
        data: {
          isHidden,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      if (err instanceof TRPCError) return err;
      return Promise.reject(new Error(JSON.stringify(err)).message);
    }
  });

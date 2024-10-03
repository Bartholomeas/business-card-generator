
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { addCommentInputSchema } from "../company.schemas";


export const addCompanyComment = protectedProcedure
  .input(addCommentInputSchema)
  .mutation(async ({ ctx, input: { commentsSectionId, content } }) => {
    try {
      const { id } = ctx.session.user;
      const { id: userDetailsId } = (await ctx.db.userDetails.findUnique({
        where: {
          userId: id,
        },
        select: { id: true },
      })) ?? { id: undefined };

      if (!userDetailsId)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie znaleziono ID użytkownika",
        });


      return await ctx.db.comment.create({
        data: { content, userDetailsId, commentsSectionId },
      });
    } catch (err) {
      if (err instanceof TRPCError) throw err;
      throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
    }
  });

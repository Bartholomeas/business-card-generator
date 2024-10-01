import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const deleteCompanyComment = protectedProcedure
	.input(z.object({ commentId: z.string() }))
	.mutation(async ({ ctx, input: { commentId } }) => {
		try {
			return await ctx.db.comment.delete({
				where: {
					id: commentId,
				},
			});
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
		}
	});

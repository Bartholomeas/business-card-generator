import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

export const getAvatar = publicProcedure
	.input(z.object({ avatarId: z.string().nullable().optional() }))
	.query(async ({ ctx, input: { avatarId } }) => {
		try {
			return await ctx.db.file.findFirst({
				where: {
					key: avatarId ?? undefined,
				},
				select: {
					id: true,
					url: true,
				},
			});
		} catch (err: unknown) {
			if (err instanceof TRPCError) throw err;
			else throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: JSON.stringify(err) });
		}
	});

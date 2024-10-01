import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

export const getCurrentUserAvatar = protectedProcedure.query(async ({ ctx }) => {
	const { avatarId } = ctx.session.user;
	try {
		return await ctx.db.file.findFirst({
			where: { key: avatarId },
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

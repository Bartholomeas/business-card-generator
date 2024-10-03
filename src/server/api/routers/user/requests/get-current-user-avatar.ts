import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

export const getCurrentUserAvatar = protectedProcedure.query(async ({ ctx }) => {
	const { id } = ctx.session.user;
	try {
		const user = await ctx.db.user.findUnique({
			where: { id },
			select: { avatarId: true },
		});

		console.log("FAFFAAF", user);

		if (!user) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "User not found",
			});
		}

		if (!user.avatarId) {
			return null;
		}

		return await ctx.db.file.findFirst({
			where: { key: user.avatarId },
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

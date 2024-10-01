import { protectedProcedure } from "~/server/api/trpc";

import { utapi } from "~/app/api/uploadthing/core";

export const deleteAvatar = protectedProcedure.mutation(async ({ ctx }) => {
	const { email, avatarId } = ctx.session.user;

	const file = await ctx.db.file.findFirst({
		where: { key: avatarId },
	});

	if (file) {
		await ctx.db.file.delete({ where: { id: file.id } });
		await utapi.deleteFiles(file.key);
	}

	if (email)
		await ctx.db.user.update({
			where: { email },
			data: {
				avatarId: null,
			},
		});
});

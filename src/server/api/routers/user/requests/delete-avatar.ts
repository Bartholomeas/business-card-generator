import { awsOperations } from "~/server/api/services/aws-s3";
import { protectedProcedure } from "~/server/api/trpc";

export const deleteAvatar = protectedProcedure.mutation(async ({ ctx }) => {
	const { email, avatarId } = ctx.session.user;

	const file = await ctx.db.file.findFirst({
		where: { key: avatarId },
	});

	if (file) {
		await ctx.db.file.delete({ where: { id: file.id } });
		await awsOperations.removeFile(file.key);
	}

	if (email)
		await ctx.db.user.update({
			where: { email },
			data: {
				avatarId: null,
			},
		});
});

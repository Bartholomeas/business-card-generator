import { TRPCError } from "@trpc/server";

import { awsOperations } from "~/server/api/services/aws-s3";
import { protectedProcedure } from "~/server/api/trpc";

import { updateUserAvatarSchema } from "../user.schemas";

export const updateUserAvatar = protectedProcedure
	.input(updateUserAvatarSchema)
	.mutation(async ({ ctx, input }) => {
		const { id } = ctx.session.user;

		try {
			const user = await ctx.db.user.findFirst({
				where: { id },
				select: { avatarId: true },
			});
			if (!user)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Nie znaleziono użytkownika.",
				});

			const oldFileKey = user?.avatarId;
			if (oldFileKey) {
				await awsOperations.removeFile(oldFileKey);
				await ctx.db.file.deleteMany({ where: { key: oldFileKey } });
			}

			await ctx.db.user.update({
				where: { id },
				data: {
					avatarId: input.key,
				},
			});

			return { avatarId: user?.avatarId };
		} catch (err: unknown) {
			if (err instanceof TRPCError) throw err;
		}
	});

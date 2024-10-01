import { protectedProcedure } from "../../../trpc";
import { userProfileSchema } from "../user.schemas";

export const updateUserProfile = protectedProcedure
	.input(userProfileSchema)
	.mutation(async ({ ctx, input }) => {
		const { id } = ctx.session.user;
		const { name, firstName, lastName, description } = input;

		return ctx.db.user.update({
			where: {
				id,
			},
			data: {
				name,
				firstName,
				lastName,
				description,
			},
		});
	});

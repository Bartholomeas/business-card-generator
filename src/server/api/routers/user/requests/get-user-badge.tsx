import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { UserBadge } from "~/server/api/routers/user";
import { publicProcedure } from "~/server/api/trpc";

/**
 * @description Function that gets user core data to render for example user comment.
 * @param id - May be user to get data by id
 * @param userDetailsId - May be user to get data by userDetailsId
 */
export const getUserBadge = publicProcedure
	.input(
		z.object({
			id: z.string().optional(),
			userDetailsId: z.string().optional(),
		}),
	)
	.query(async ({ ctx, input: { id, userDetailsId } }): Promise<UserBadge | undefined> => {
		try {
			let currentUser = undefined;
			if (userDetailsId) {
				const { user } = (await ctx.db.userDetails.findUnique({
					where: {
						id: userDetailsId,
					},
					select: {
						user: {
							select: {
								id: true,
								avatarId: true,
								name: true,
							},
						},
					},
				})) ?? { user: undefined };
				currentUser = user;
			} else if (id) {
				currentUser =
					(await ctx.db.user.findUnique({
						where: {
							id: userDetailsId,
						},
						select: {
							id: true,
							avatarId: true,
							name: true,
						},
					})) ?? undefined;
			}

			if (!currentUser)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Nie znaleziono sekcji FAQ.",
				});

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { avatarId = null, ...userData } = currentUser;

			const avatar = await ctx.db.file.findFirst({
				where: {
					key: currentUser?.avatarId ?? undefined,
				},
				select: {
					id: true,
					url: true,
				},
			});

			return Object.assign({}, userData, { avatar });
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
		}
	});

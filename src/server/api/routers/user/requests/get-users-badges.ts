import { TRPCError } from "@trpc/server";

import { publicProcedure } from "~/server/api/trpc";

import { getUserBadgeSchema } from "../user.schemas";
import { type UserBadge } from "../user.types";

/**
 * @description Function that gets user core data to render for example user comments.
 * @param userDetailsIds - Array of userDetailsIds to get data for multiple users
 */
export const getUsersBadges = publicProcedure
	.input(getUserBadgeSchema)
	.query(
		async ({ ctx, input: { userDetailsIds } }): Promise<Record<string, Partial<UserBadge>>> => {
			try {
				const userDetails = await ctx.db.userDetails.findMany({
					where: {
						id: { in: userDetailsIds },
					},
					select: {
						id: true,
						user: {
							select: {
								id: true,
								avatarId: true,
							},
						},
					},
				});

				const avatarIds = userDetails
					.map(detail => detail.user.avatarId)
					.filter((id): id is string => id !== null);

				const avatars = await ctx.db.file.findMany({
					where: {
						key: { in: avatarIds },
					},
					select: {
						id: true,
						url: true,
						key: true,
					},
				});

				const avatarMap = new Map(
					avatars.map(avatar => [avatar.key, { id: avatar.id, url: avatar.url }]),
				);

				const userBadges: Record<string, Partial<UserBadge>> = {};

				for (const detail of userDetails) {
					const { id: userDetailsId, user } = detail;
					const { avatarId, id, ...userData } = user;

					userBadges[userDetailsId] = {
						...userData,
						id,
						avatar: avatarId ? (avatarMap.get(avatarId) ?? null) : null,
					};
				}

				return userBadges;
			} catch (err) {
				if (err instanceof TRPCError) throw err;
				throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
			}
		},
	);

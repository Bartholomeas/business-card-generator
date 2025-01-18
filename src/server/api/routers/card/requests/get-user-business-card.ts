import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

import { type BusinessCard } from "../card.types";

export const getUserBusinessCard = protectedProcedure
	.input(
		z
			.object({
				cardId: z.string().optional(),
			})
			.optional(),
	)
	.query(async ({ ctx, input }): Promise<BusinessCard | undefined> => {
		const { id } = ctx.session.user;

		try {
			const userDetails = await ctx.db.userDetails.findFirst({
				where: { userId: id },
			});

			if (!userDetails) return undefined;

			const businessCard = await ctx.db.businessCard.findFirst({
				where: {
					...(input?.cardId ? { id: input.cardId } : {}),

					// userDetailsOnBusinessCard: {
					// 	some: {
					// 		userDetailsId: userDetails.id,
					// 	},
					// },
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					generalStyles: true,
					defaultTextElements: true,
					back: {
						select: {
							id: true,
							styles: true,
							textElements: true,
						},
					},
					front: {
						select: {
							id: true,
							styles: true,
							textElements: true,
						},
					},
					qrLink: true,
				},
			});

			return businessCard as unknown as BusinessCard;
		} catch (err) {
			console.error("Error fetching business card:", err);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił błąd podczas pobierania wizytówki.",
			});
		}
	});

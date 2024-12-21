import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { type BusinessCard } from "../card.types";

export const getAllCards = protectedProcedure.query(async ({ ctx }): Promise<BusinessCard[]> => {
	const { id } = ctx.session.user;

	try {
		const cards = await ctx.db.userDetails.findFirst({
			where: {
				userId: id,
			},
			select: {
				businessCards: {
					select: {
						businessCard: {
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
						},
					},
				},
			},
		});

		if (!cards?.businessCards?.length) return [];

		return cards.businessCards.map(card => card.businessCard) as unknown as BusinessCard[];
	} catch (err) {
		if (err instanceof TRPCError) throw err;
		else
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił nieznany błąd.",
			});
	}
});

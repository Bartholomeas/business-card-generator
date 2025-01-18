import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { type BusinessCard } from "../card.types";

export const getAllCards = protectedProcedure.query(async ({ ctx }): Promise<BusinessCard[]> => {
	const { id } = ctx.session.user;

	try {
		const userDetails = await ctx.db.userDetails.findFirst({
			where: { userId: id },
		});

		if (!userDetails) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Nie znaleziono profilu użytkownika",
			});
		}

		const cardsRelation = await ctx.db.userDetailsOnBusinessCard.findMany({
			where: {
				userDetailsId: userDetails.id,
			},
			select: {
				businessCard: {
					select: {
						id: true,
						createdAt: true,
						updatedAt: true,
						generalStyles: true,
						defaultTextElements: {
							select: {
								id: true,
								text: true,
								code: true,
								positionX: true,
								positionY: true,
								color: true,
								fontSize: true,
								fontFamily: true,
								fontWeight: true,
								fontStyle: true,
								textDecoration: true,
								textAlign: true,
								lineHeight: true,
								letterSpacing: true,
								isHidden: true,
								zIndex: true,
							},
						},
						back: {
							select: {
								id: true,
								styles: true,
								textElements: {
									select: {
										id: true,
										text: true,
										code: true,
										positionX: true,
										positionY: true,
										color: true,
										fontSize: true,
										fontFamily: true,
										fontWeight: true,
										fontStyle: true,
										textDecoration: true,
										textAlign: true,
										lineHeight: true,
										letterSpacing: true,
										isHidden: true,
										zIndex: true,
									},
								},
							},
						},
						front: {
							select: {
								id: true,
								styles: true,
								textElements: {
									select: {
										id: true,
										text: true,
										code: true,
										positionX: true,
										positionY: true,
										color: true,
										fontSize: true,
										fontFamily: true,
										fontWeight: true,
										fontStyle: true,
										textDecoration: true,
										textAlign: true,
										lineHeight: true,
										letterSpacing: true,
										isHidden: true,
										zIndex: true,
									},
								},
							},
						},
						qrLink: true,
						companyId: true,
						company: {
							select: {
								id: true,
								companyName: true,
							},
						},
					},
				},
			},
		});

		return cardsRelation.map(relation => relation.businessCard) as unknown as BusinessCard[];
	} catch (err) {
		console.error("Error fetching cards:", err);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Wystąpił błąd podczas pobierania wizytówek.",
		});
	}
});

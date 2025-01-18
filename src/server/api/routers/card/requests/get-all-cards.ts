import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

export const getAllCards = protectedProcedure.query(async ({ ctx }) => {
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

		return await ctx.db.businessCard.findMany({
			where: {
				userDetailsOnBusinessCard: {
					some: {
						userDetailsId: userDetails.id,
					},
				},
			},
			include: {
				company: {
					select: {
						companyName: true,
					},
				},
			},
		});
	} catch (err) {
		console.error("Error fetching cards:", err);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Wystąpił błąd podczas pobierania wizytówek.",
		});
	}
});

import { TRPCError } from "@trpc/server";

import type { BusinessCard } from "~/server/api/routers/card";
import { protectedProcedure } from "~/server/api/trpc";

export const getUserBusinessCard = protectedProcedure.query(
	async ({ ctx }): Promise<BusinessCard | undefined> => {
		const { id } = ctx.session.user;

		try {
			const businessCardResult = await ctx.db.userDetails.findFirst({
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

			const businessCard = businessCardResult?.businessCards?.[0]?.businessCard;

			if (!businessCard) return undefined;
			// throw new TRPCError({
			//   code: "NOT_FOUND",
			//   message: "Nie mogliśmy znaleźć wizytówki.",
			// });

			return businessCard as unknown as BusinessCard;
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			else
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Wystąpił nieznany błąd.",
				});
		}
	},
);

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const createCompanyBusinessCard = protectedProcedure
	.input(
		z.object({
			companyId: z.string(),
		}),
	)
	.mutation(async ({ ctx, input }) => {
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

			return await ctx.db.$transaction(async db => {
				const businessCard = await db.businessCard.create({
					data: {
						front: {
							create: {
								styles: {},
								textElements: { create: [] },
							},
						},
						back: {
							create: {
								styles: {},
								textElements: { create: [] },
							},
						},
						generalStyles: {},
						defaultTextElements: { create: [] },
						qrLink: "",
						company: {
							connect: {
								id: input.companyId,
							},
						},
					},
				});

				// Connect business card with user
				await db.userDetailsOnBusinessCard.create({
					data: {
						userDetailsId: userDetails.id,
						businessCardId: businessCard.id,
					},
				});

				return businessCard;
			});
		} catch (err) {
			console.error("Error creating business card:", err);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił błąd podczas tworzenia wizytówki.",
			});
		}
	});

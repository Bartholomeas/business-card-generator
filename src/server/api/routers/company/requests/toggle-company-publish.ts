import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const toggleCompanyPublish = protectedProcedure
	.input(
		z.object({
			companyId: z.string(),
			isPublished: z.boolean(),
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

			// Check if user has access to this company
			const userCompany = await ctx.db.userDetailsOnCompany.findFirst({
				where: {
					userDetailsId: userDetails.id,
					companyId: input.companyId,
				},
			});

			if (!userCompany) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "Nie masz uprawnień do tej firmy",
				});
			}

			return await ctx.db.company.update({
				where: { id: input.companyId },
				data: { isPublished: input.isPublished },
			});
		} catch (err) {
			console.error("Error toggling company publish status:", err);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił błąd podczas aktualizacji statusu firmy.",
			});
		}
	});

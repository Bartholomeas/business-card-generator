import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { type UserCompanyItem } from "../company.types";

export const getUserCompanies = protectedProcedure.query(
	async ({ ctx }): Promise<UserCompanyItem[]> => {
		if (!ctx.session?.user?.id) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Nie jesteś zalogowany",
			});
		}

		try {
			const userDetails = await ctx.db.userDetails.findFirst({
				where: { userId: ctx.session.user.id },
			});

			if (!userDetails) {
				return []; // Return empty array if no user details found
			}

			const userCompanies = await ctx.db.userDetailsOnCompany.findMany({
				where: {
					userDetailsId: userDetails.id,
				},
				select: {
					company: {
						select: {
							id: true,
							slug: true,
							companyName: true,
							nip: true,
							logoId: true,
						},
					},
				},
			});

			return userCompanies.map(c => c.company);
		} catch (err) {
			console.error("Error fetching user companies:", err);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił błąd podczas pobierania firm.",
			});
		}
	},
);

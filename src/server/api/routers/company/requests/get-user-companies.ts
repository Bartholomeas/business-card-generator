import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { type UserCompanyItem } from "../company.types";

export const getUserCompanies = protectedProcedure.query(
	async ({ ctx }): Promise<UserCompanyItem[]> => {
		const { id } = ctx.session.user;
		try {
			const userCompanies = await ctx.db.userDetailsOnCompany.findMany({
				where: {
					userDetails: {
						userId: id,
					},
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
			if (err instanceof TRPCError) throw err;
			else
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Wystąpił nieznany błąd.",
				});
		}
	},
);

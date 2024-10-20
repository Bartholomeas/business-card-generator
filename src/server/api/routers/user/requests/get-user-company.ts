import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

export const getUserCompany = protectedProcedure.query(async ({ ctx }) => {
	const { id } = ctx.session.user;
	try {
		const companies = await ctx.db.userDetails.findFirst({
			where: {
				userId: id,
			},
			select: {
				company: {
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
				},
			},
		});

		if (!companies) return [];

		return companies.company.map(c => c.company);
	} catch (err) {
		if (err instanceof TRPCError) throw err;
		else
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił nieznany błąd.",
			});
	}
});

import { TRPCError } from "@trpc/server";

import { publicProcedure } from "~/server/api/trpc";

export const getAllCompanies = publicProcedure.query(async ({ ctx }) => {
	try {
		return await ctx.db.companyPage.findMany({
			include: {
				company: true,
			},
		});
	} catch (err) {
		if (err instanceof TRPCError) {
			throw err;
		}
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "An unexpected error occurred while fetching companies",
		});
	}
});

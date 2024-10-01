import { TRPCError } from "@trpc/server";
import slugify from "slugify";

import { userCompanySchema } from "~/server/api/routers/company/company.schemas";

import { protectedProcedure } from "../../../trpc";

export const updateUserCompany = protectedProcedure
	.input(userCompanySchema)
	.mutation(async ({ ctx, input }) => {
		const { id } = ctx.session.user;

		if (!input.companyName)
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Nazwa firmy nie może być pusta.",
			});

		try {
			const company = await ctx.db.company.findFirst({
				where: {
					usersDetails: {
						some: {
							userDetails: {
								userId: id,
							},
						},
					},
				},
				select: {
					id: true,
				},
			});

			return await ctx.db.company.update({
				where: {
					id: company?.id,
				},
				data: {
					...input,
					slug: slugify(input.companyName, {
						lower: true,
						strict: true,
					}),
				},
			});
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			return Promise.reject(new Error(JSON.stringify(err)).message);
		}
	});

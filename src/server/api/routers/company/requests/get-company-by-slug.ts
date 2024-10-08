import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { type Company } from "~/server/api/routers/company";
import { publicProcedure } from "~/server/api/trpc";

export const getCompanyBySlug = publicProcedure
	.input(z.object({ slug: z.string().optional() }))
	.query(async ({ ctx, input: { slug } }) => {
		try {
			const company = await ctx.db.company.findFirst({
				where: { slug },
			});
			if (company?.isPublished) return company as unknown as Company;
			else
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Nie znaleziono firmy.",
				});
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
		}
	});

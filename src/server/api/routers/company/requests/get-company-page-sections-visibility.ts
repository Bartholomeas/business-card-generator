import { type CompanyPageSectionTypes } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { getCompanyPageSectionsVisibilitySchema } from "../company.schemas";

// The type is unknown because the return type of getCompanyPageSectionsVisibility
// is inferred from the async function, which can be complex to determine statically.
// It's better to explicitly define the return type for clarity and type safety.

export const getCompanyPageSectionsVisibility = protectedProcedure
	.input(getCompanyPageSectionsVisibilitySchema)
	.query(async ({ ctx, input }) => {
		try {
			if (!input.companySlug)
				throw new TRPCError({ code: "BAD_REQUEST", message: "Company slug is required" });
			return await ctx.db.companyPage.findUnique({
				where: {
					slug: input.companySlug,
				},
				select: {
					company: {
						select: {
							companyName: true,
							id: true,
							isPublished: true,
						},
					},
					sections: {
						select: {
							id: true,
							sectionType: true,
							isVisible: true,
						},
					},
				},
			});
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
		}
	});

export type GetCompanyPageSectionsVisibilityResponse = {
	sectionType: CompanyPageSectionTypes;
	isVisible: boolean;
}[];

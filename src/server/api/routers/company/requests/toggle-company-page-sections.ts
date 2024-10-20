import { type CompanyPageSectionTypes } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { toggleCompanyPageSectionsPayloadSchema } from "../company.schemas";

export const toggleCompanyPageSections = protectedProcedure
	.input(toggleCompanyPageSectionsPayloadSchema)
	.mutation(async ({ ctx, input }) => {
		try {
			const { companySlug, ...sectionUpdates } = input;

			return await ctx.db.companyPage.update({
				where: { slug: companySlug },
				select: {
					sections: true,
				},
				data: {
					sections: {
						updateMany: Object.entries(sectionUpdates).map(([sectionType, isVisible]) => ({
							where: {
								sectionType: sectionType as CompanyPageSectionTypes,
							},
							data: { isVisible },
						})),
					},
				},
			});
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
		}
	});

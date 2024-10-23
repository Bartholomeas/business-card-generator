import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "~/server/api/trpc";

import { reorderCompanySectionsSchema } from "../company.schemas";

export const reorderCompanySections = protectedProcedure
	.input(reorderCompanySectionsSchema)
	.mutation(async ({ input, ctx }) => {
		try {
			const { companySlug, sections } = input;

			const companyPage = await ctx.db.companyPage.findUnique({
				where: {
					slug: companySlug,
				},
				select: {
					sections: {
						select: {
							id: true,
							sectionType: true,
						},
					},
				},
			});

			if (!companyPage?.sections?.length)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Strona firmowa nie została znaleziona",
				});

			const orderedSections = companyPage?.sections?.sort((a, b) => {
				return (sections?.indexOf(a.sectionType) ?? 1) - (sections?.indexOf(b.sectionType) ?? 1);
			});

			await ctx.db.companyPage.update({
				where: {
					slug: companySlug,
				},
				data: {
					sections: {
						update: orderedSections?.map(section => ({
							where: { id: section.id },
							data: {
								sectionType: section.sectionType,
							},
						})),
					},
				},
			});

			return { success: true };
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił wewnętrzny błąd podczas zmiany kolejności sekcji",
			});
		}
	});

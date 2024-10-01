import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import { z } from "zod";

import type { CommentsSection } from "~/server/api/routers/company";
import { publicProcedure } from "~/server/api/trpc";

import { DATE_FORMAT } from "~/misc";


export const getCommentsSection = publicProcedure
	.input(z.object({ id: z.string().optional() }))
	.query(async ({ ctx, input: { id } }): Promise<CommentsSection | undefined> => {
		try {
			const section = await ctx.db.companyPageSection.findUnique({
				where: {
					id,
				},
				include: {
					commentsSection: {
						select: {
							id: true,
							title: true,
							items: {
								select: {
									id: true,
									createdAt: true,
									updatedAt: true,
									content: true,
									userDetailsId: true,
								},
								orderBy: {
									createdAt: "desc",
								},
							},
						},
					},
				},
			});
			if (!section)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Nie znaleziono sekcji FAQ.",
				});

			const commentsSection = {
				...section?.commentsSection,
				items: section?.commentsSection?.items?.map(comment => ({
					...comment,
					createdAt: dayjs(comment?.createdAt).format(DATE_FORMAT),
					updatedAt: dayjs(comment?.createdAt).format(DATE_FORMAT),
				})),
			} as CommentsSection;

			return commentsSection ?? undefined;
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			throw new TRPCError({ code: "BAD_REQUEST", message: JSON.stringify(err) });
		}
	});

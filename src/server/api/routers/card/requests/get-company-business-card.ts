import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { BusinessCard } from "~/server/api/routers/card";
import { publicProcedure } from "~/server/api/trpc";


export const getCompanyBusinessCard = publicProcedure
	.input(
		z.object({
			companyId: z.string(),
		}),
	)
	.query(async ({ ctx, input: { companyId } }): Promise<BusinessCard | undefined> => {
		try {
			const businessCard = await ctx.db.businessCard.findFirst({
				where: {
					companyId,
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					generalStyles: true,
					defaultTextElements: true,
					back: {
						select: {
							id: true,
							styles: true,
							textElements: true,
						},
					},
					front: {
						select: {
							id: true,
							styles: true,
							textElements: true,
						},
					},
					qrLink: true,
				},
			});

			if (!businessCard)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Nie mogliśmy znaleźć wizytówki.",
				});

			return businessCard as unknown as BusinessCard;
		} catch (err) {
			if (err instanceof TRPCError) throw err;
			else
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Wystąpił nieznany błąd.",
				});
		}
	});

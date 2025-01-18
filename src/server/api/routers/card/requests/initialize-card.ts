import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const initializeCard = protectedProcedure.input(z.object({})).mutation(async ({ ctx }) => {
	try {
		return await ctx.db.businessCard.create({
			data: {
				front: {
					create: {
						styles: {},
						textElements: { create: [] },
					},
				},
				back: {
					create: {
						styles: {},
						textElements: { create: [] },
					},
				},
				generalStyles: {},
				defaultTextElements: { create: [] },
				qrLink: "",
			},
		});
	} catch (err) {
		if (err instanceof TRPCError) {
			throw err;
		}

		console.error("Error initializing card:", err);

		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Wystąpił błąd podczas tworzenia wizytówki. Spróbuj ponownie później.",
		});
	}
});

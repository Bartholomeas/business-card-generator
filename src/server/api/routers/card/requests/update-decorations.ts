import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

const DecorationElementSchema = z.object({
	type: z.literal("ICON"),
	src: z.string(),
	width: z.number(),
	height: z.number(),
	positionX: z.number(),
	positionY: z.number(),
	scaleX: z.number(),
	scaleY: z.number(),
	opacity: z.number(),
	zIndex: z.number(),
	side: z.enum(["front", "back"]),
	id: z.string().uuid(),
});

export const DecorationsInputSchema = z.object({
	configId: z.string(),
	decorations: z.array(DecorationElementSchema),
});

export type UpdateDecorationsPayload = z.infer<typeof DecorationsInputSchema>;

export const updateDecorations = protectedProcedure
	.input(DecorationsInputSchema)
	.mutation(async ({ ctx, input }) => {
		const { configId, decorations } = input;

		try {
			await ctx.db.businessCardConfig.update({
				where: { id: configId },
				data: {
					decorationElements: {
						set: decorations,
					},
				},
			});

			return { success: true };
		} catch (err) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Wystąpił błąd podczas aktualizacji dekoracji.",
			});
		}
	});

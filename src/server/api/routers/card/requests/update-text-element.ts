import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

import { TextElementConfigSchema } from "~/components/panel/card-wizard/edit-styles/helpers";

export const TextElementInputSchema = z.intersection(
	TextElementConfigSchema.omit({ text: true }),
	z.object({ id: z.string().optional(), text: z.string().optional() }),
);

export type UpdateTextElementPayload = z.infer<typeof TextElementInputSchema>;

export const updateTextElement = protectedProcedure
	.input(TextElementInputSchema)
	.mutation(async ({ ctx, input }) => {
		const card = await ctx.db.textElement.findUnique({
			where: { id: input.id },
		});

		const updatedData = { ...card, ...input };

		try {
			await ctx.db.textElement.update({
				where: {
					id: input.id,
				},
				data: updatedData,
			});
		} catch (err) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Wystąpił błąd.",
			});
		}

		return updatedData;
	});

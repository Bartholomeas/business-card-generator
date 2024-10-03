import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "~/server/api/trpc";

export const getFile = publicProcedure
	.input(z.object({ fileId: z.string() }))
	.query(async ({ ctx, input }) => {
		try {
			const file = await ctx.db.file.findUnique({
				where: {
					key: input.fileId,
				},
			});
			console.log("GETFILE: ", { file, FILEID: input.fileId });
			if (!file)
				throw new TRPCError({
					code: "NOT_FOUND",
					message: `Plik z kluczem ${input.fileId} nie został znaleziony.`,
				});
			return file;
		} catch (error) {
			if (error instanceof TRPCError) throw error;
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Wystąpił nieznany błąd: ${JSON.stringify(error)}`,
			});
		}
	});

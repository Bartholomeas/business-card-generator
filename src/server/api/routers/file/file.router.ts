import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db } from "~/server/db";

import { getFile, uploadFile } from "./requests";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const fileRouter = createTRPCRouter({
	getFile,
	uploadFile,
	getFileOld: protectedProcedure
		.input(z.object({ key: z.string() }))
		.mutation(async ({ ctx, input: { key } = { key: "" } }) => {
			try {
				const { id } = ctx.session.user;
				const file = await db.file.findUnique({
					where: {
						key,
						userId: id,
					},
				});

				if (!file)
					throw new TRPCError({
						code: "NOT_FOUND",
						message: `Plik z kluczem ${key} nie został znaleziony.`,
					});
				return file;
			} catch (error) {
				if (error instanceof TRPCError) throw error;
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `Wystąpił nieznany błąd: ${JSON.stringify(error)}`,
				});
			}
		}),
});

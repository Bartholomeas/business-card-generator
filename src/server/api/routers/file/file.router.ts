import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { db } from "~/server/db";

export const fileRouter = createTRPCRouter({
	getFile: protectedProcedure
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

	// convertPhotoToWebp: publicProcedure
	//   .input(z.object({ img: z.unknown() }))
	//   .mutation(async ({ input }) => {
	//     if (!input?.img)
	//       throw new TRPCError({
	//         code: "BAD_REQUEST",
	//         message: "Brak pliku do konwersji.",
	//       });
	//
	//     const img = input.img as File;
	//
	//     const webpBuffer = await img.arrayBuffer();
	//
	//     return sharp(webpBuffer)
	//       .toFormat("webp")
	//       .webp({ quality: 75 })
	//       .resize(150, 150)
	//       .toFile("test.webp");
	//
	//     // const webpBlob = new Blob([file], { type: "image/webp" });
	//     // const webpFile = new File([webpBlob], "nowyplik.webp", {
	//     //   type: "image/webp",
	//     // });
	//   }),
});

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import crypto from "crypto";

import { TRPCError } from "@trpc/server";

import { awsOperations } from "~/server/api/services/aws-s3";
import { protectedProcedure } from "~/server/api/trpc";

import { uploadFileSchema } from "../file.schemas";
import { optimizeImage } from "../file.utils";

export const uploadFile = protectedProcedure
	.input(uploadFileSchema)
	.mutation(async ({ ctx, input }) => {
		try {
			const fileBuffer = Buffer.from(input.dataUrl?.split(",")[1] ?? "", "base64");
			const { buffer: optimizedBuffer, contentType: newContentType } = await optimizeImage(
				fileBuffer,
				input?.type ?? "image/png",
			);

			const key = `${crypto.randomUUID()}-${input.name?.replace(/\.[^/.]+$/, "")}.webp`;
			const url = await awsOperations.uploadFile(key, optimizedBuffer, newContentType);

			return await ctx.db.file.create({
				data: {
					key,
					url,
					userId: ctx.session.user.id,
					name: key,
				},
			});
		} catch (err) {
			console.log("ERRRR", err);
			if (err instanceof Error)
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err?.message,
				});
			else
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "An error occurred while uploading the file.",
				});
		}
	});

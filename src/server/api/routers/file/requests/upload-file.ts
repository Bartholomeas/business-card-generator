/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import crypto from "crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { TRPCError } from "@trpc/server";

import { s3 } from "~/lib/aws-s3";

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

			const command = new PutObjectCommand({
				Bucket: process.env.AWS_BUCKET,
				Key: key,
				Body: optimizedBuffer,
				ContentType: newContentType,
			});

			await s3.send(command);

			const url = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

			// Create and return the file record
			return await ctx.db.file.create({
				data: {
					key,
					url,
					userId: ctx.session.user.id,
					name: key,
				},
			});
		} catch (err) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "An error occurred while uploading the file.",
			});
		}
	});

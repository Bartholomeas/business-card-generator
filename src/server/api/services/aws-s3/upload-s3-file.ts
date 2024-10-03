import { PutObjectCommand } from "@aws-sdk/client-s3";
import { TRPCError } from "@trpc/server";

import { s3 } from "~/lib/aws-s3";

export const uploadS3File = async (
	key: string,
	buffer: Buffer,
	contentType: string,
): Promise<string> => {
	try {
		const command = new PutObjectCommand({
			Bucket: process.env.AWS_BUCKET,
			Key: key,
			Body: buffer,
			ContentType: contentType,
		});
		await s3.send(command);

		return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
	} catch (err) {
		if (err instanceof Error)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to upload file: ${err.message}`,
			});
		else
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "An unexpected error occurred while uploading the file.",
			});
	}
};

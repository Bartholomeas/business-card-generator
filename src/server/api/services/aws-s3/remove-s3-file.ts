import { DeleteObjectCommand, type DeleteObjectCommandOutput } from "@aws-sdk/client-s3";
import { TRPCError } from "@trpc/server";

import { s3 } from "~/lib/aws-s3";

export const removeS3File = async (key: string): Promise<DeleteObjectCommandOutput | undefined> => {
	try {
		const command = new DeleteObjectCommand({
			Bucket: process.env.AWS_BUCKET,
			Key: key,
		});

		return await s3.send(command);
	} catch (err) {
		if (err instanceof Error)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Failed to remove file: ${err.message}`,
			});
		else
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "An unexpected error occurred while removing the file.",
			});
	}
};

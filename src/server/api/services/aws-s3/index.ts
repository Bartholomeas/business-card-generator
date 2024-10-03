import { removeS3File } from "./remove-s3-file";
import { uploadS3File } from "./upload-s3-file";

export const awsOperations = {
	uploadFile: uploadS3File,
	removeFile: removeS3File,
};

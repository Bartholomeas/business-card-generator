const fileExtRegex = /data:([^;]+);base64/;

/**
 * @description - Function that transforms data with file url to File object.
 * @param {string} url - Url to file that you want to upload
 * @param {string?} fileName - Optional
 * @returns {Promise<File[]>} - Array of file objects
 * @
 */
export const dataUrlToFile = async (url: string, fileName?: string): Promise<File[]> => {
	const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
	fileName = fileName || uniqueFileName;

	const [mediaType] = url.split(",");
	// const mime = mediaType?.match(/:(.*?);/)?.[1];
	const mime = mediaType?.match(fileExtRegex)?.[1];

	const fileExt = mime?.split("/")[1];

	const fileBlob = await fetch(url).then(async data => data.blob());
	const newFile = new File([fileBlob], `${fileName}.${fileExt}`, {
		type: mime,
	});

	return [newFile];
};

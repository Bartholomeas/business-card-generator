import sharp from "sharp";

export const optimizeImage = async (
	buffer: Buffer,
	contentType: string,
): Promise<{ buffer: Buffer; contentType: string }> => {
	if (!contentType.startsWith("image/")) return { buffer, contentType };

	try {
		const optimizedBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

		return { buffer: optimizedBuffer, contentType: "image/webp" };
	} catch (error) {
		console.error("Error optimizing image:", error);
		return { buffer, contentType };
	}
};

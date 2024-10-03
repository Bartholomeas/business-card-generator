// @ts-nocheck
import { parentPort, workerData } from "node:worker_threads";
import sharp from "sharp";

async function optimizeImage(buffer, contentType) {
	try {
		const optimizedBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
		return { buffer: optimizedBuffer, contentType: "image/webp" };
	} catch (error) {
		console.error("Error optimizing image:", error);
		return { buffer, contentType };
	}
}

if (!parentPort) {
	throw new Error("This module must be run as a worker thread");
}

const { buffer, contentType } = workerData;

optimizeImage(buffer, contentType)
	.then(result => parentPort.postMessage(result))
	.catch(error => {
		if (error instanceof Error) return parentPort.postMessage({ error: error.message });
		return parentPort.postMessage({ error: "Unknown error" });
	});

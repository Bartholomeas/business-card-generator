import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const optimizeImage = async (
	buffer: Buffer,
	contentType: string,
): Promise<{ buffer: Buffer; contentType: string }> => {
	if (!contentType.startsWith("image/")) return { buffer, contentType };

	return new Promise((resolve, reject) => {
		const workerPath = path.join(__dirname, "image-optimizer.worker.js");

		const worker = new Worker(workerPath, {
			workerData: { buffer, contentType },
		});

		worker.on("message", resolve);
		worker.on("error", reject);
		worker.on("exit", code => {
			if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
		});
	});
};

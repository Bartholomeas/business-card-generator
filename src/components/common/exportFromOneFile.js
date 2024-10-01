import { basename, extname, join } from "path";
import { lstatSync, readdirSync, writeFileSync } from "fs";

const currDir = __dirname;

const collectAllFiles = () => {
	const items = readdirSync(currDir);
	const files = items.filter(
		item =>
			lstatSync(join(currDir, item)).isFile() && item !== "index.tsx" && extname(item) === ".tsx",
	);

	let exports = "";

	for (const file of files) {
		const baseName = basename(file, ".tsx");
		console.log(baseName);
		exports += `export * from './${baseName}';\n`;
	}

	writeFileSync(join(currDir, "index.ts"), exports);
};

collectAllFiles();

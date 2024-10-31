import fs from "fs";

function main() {
	const list = fs.readdirSync(".").filter(file => file.endsWith(".svg"));
	let result = list.map(filename => ({
		type: "icon",
		id: filename.replace(".svg", ""),
		name: filename.replace(".svg", "").replaceAll("-", " "),
		icon: filename,
	}));
	fs.writeFileSync("./../../src/config/icons.json", JSON.stringify(result));
}

main();

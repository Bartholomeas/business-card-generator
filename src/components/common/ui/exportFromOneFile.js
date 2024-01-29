/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");

const currDir = __dirname;

const collectAllFiles = () => {
  const items = fs.readdirSync(currDir);
  const files = items.filter(
    item =>
      fs.lstatSync(path.join(currDir, item)).isFile() &&
      item !== "index.tsx" &&
      path.extname(item) === ".tsx",
  );

  let exports = "";

  for (const file of files) {
    const baseName = path.basename(file, ".tsx");
    console.log(baseName);
    exports += `export * from './${baseName}';\n`;
  }

  fs.writeFileSync(path.join(currDir, "index.ts"), exports);
};

collectAllFiles();

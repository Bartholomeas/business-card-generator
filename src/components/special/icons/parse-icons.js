import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, join, extname, basename } from "path";
import { parseSync } from "svgson";

/**
 * @type {string | string[]}
 */
const replaceExceptions = [];

const rootDir = resolve(__dirname, "../../../../../");
const iconsDir = join(rootDir, "public/svg");
const iconsFileDir = join(__dirname, "icon.tsx");
console.log(rootDir);
// Script that creates React component functions from SVG files.

const getIcons = () => {
  let icons = {};

  const iconsArr = readdirSync(iconsDir);

  iconsArr.forEach(file => {
    const filePath = join(iconsDir, file);

    if (extname(file) === ".svg") {
      const currFile = readFileSync(filePath, "utf-8");

      const iconName = basename(file, ".svg");

      const capitalizedIconName = `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;

      icons[capitalizedIconName] = currFile;
    }
  });

  return icons;
};

const icons = getIcons();

const createIconsComponentContent = icons => {
  let iconNames = [];

  const iconsContent = Object.entries(icons)

    .map(([name, svg]) => {
      const componentName = name
        .split("-")
        .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join("");

      iconNames.push(componentName);

      const svgObject = parseSync(svg);
      const svgWidth = svgObject.attributes.width || 24;
      const svgHeight = svgObject.attributes.height || 24;

      let svgWithProps = svg
        .replace(`width="${svgWidth}"`, "width={width}")
        .replace(`height="${svgHeight}"`, "height={height} {...props}")
        .replace(/stroke-width/g, "strokeWidth")
        .replace(/stroke-linecap/g, "strokeLinecap")
        .replace(/stroke-linejoin/g, "strokeLinejoin")
        .replace(/stroke-miterlimit/g, "strokeMiterlimit")
        .replace(/clip-path/g, "clipPath")
        .replace(/clip-rule/g, "clipRule")
        .replace(/fill-rule/g, "fillRule");

      if (!replaceExceptions.includes(name.toLowerCase())) {
        svgWithProps = svgWithProps
          .replace(/fill="(?!none)[^"]+"/g, 'fill="currentColor"')
          .replace(/stroke="(?!none)[^"]+"/g, 'stroke="currentColor"');
      }
      return `${componentName}: ({ width = ${svgWidth}, height = ${svgHeight}, ...props }: IconProps) => (${svgWithProps})`;
    })
    .join(",");

  return `
  import { ComponentProps } from "react";

  export type IconProps = React.HTMLAttributes<SVGElement> & {
    width?: number,
    height?: number,
    className?: ComponentProps<'div'>['className']};
  export type IconNames = ${iconNames.map(el => `"${el}"`).join(" | ")};
  export type IconComponent = (props: IconProps) => JSX.Element
  type Icon = { [K in IconNames]: IconComponent }
  
  export const Icon: Icon = {
    ${iconsContent}
  }`;
};

const fileContent = createIconsComponentContent(icons);

const writeToFile = content => {
  writeFileSync(iconsFileDir, content);
};

writeToFile(fileContent);

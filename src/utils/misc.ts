import { type TextElementCodes, type TextElement } from "~/server/api/routers/user";

export type MappedDefaultTextElements = Partial<Record<TextElementCodes, TextElement>>;

export const mapDefaultTextsToObjects = (
  data: TextElement[] | undefined,
): MappedDefaultTextElements | undefined => {
  if (!data) return undefined;
  const newArr = [...data];

  return newArr.reduce((acc, el) => {
    if (el.code) {
      return { ...acc, [el.code as string]: { ...el } };
    }

    return acc;
  }, {});
};

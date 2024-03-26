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

export const parseObjectNullsToUndefined = <T extends Record<string, unknown> | undefined>(
  data: T,
): T => {
  return data
    ? Object.entries(data).reduce((acc, [key, value]) => {
        return { ...acc, [key]: value === null ? undefined : value };
      }, {} as T)
    : data;
};

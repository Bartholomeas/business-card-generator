import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

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

export const parseObjectNullsToUndefined = <T extends Record<string, unknown>>(
  data: T,
): { [P in keyof T]: T[P] | undefined } | undefined => {
  if (!data) return data;

  const result: Partial<{ [P in keyof T]: T[P] | undefined }> = {};

  for (const key in data)
    if (data[key] === null) result[key] = undefined;
    else result[key] = data[key];

  return result as { [P in keyof T]: T[P] | undefined };
};

export const parseObjectUndefinedToNulls = <T extends Record<string, unknown>>(
  data: T,
): { [P in keyof T]: T[P] | null } => {
  if (!data) return data;

  const result: Partial<{ [P in keyof T]: T[P] | null }> = {};

  for (const key in data) {
    if (!data[key]) result[key] = null;
    else result[key] = data[key];
  }

  return result as { [P in keyof T]: T[P] | null };
};

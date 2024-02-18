import { type MappedDefaultTextElements } from "~/misc/utils/misc";
import { type TextElementCodes } from "~/server/api/routers/user";

export const convertTextElementsToBooleans = (
  data: MappedDefaultTextElements | undefined = {},
): Record<TextElementCodes, boolean> =>
  Object.fromEntries(
    Object.values(data)
      .filter(item => item?.code)
      .map(item => [item.code, !Boolean(item.isHidden)]),
  ) as Record<TextElementCodes, boolean>;

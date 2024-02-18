import { z } from "zod";

export const TextElementHiddenSchema = z.record(z.boolean().default(false));
export type TextElementsHidden = z.infer<typeof TextElementHiddenSchema>;

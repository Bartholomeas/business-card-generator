import { z } from "zod";

export const TextElementHiddenSchema = z.record(z.boolean().default(false));
export type TextElementsHidden = z.infer<typeof TextElementHiddenSchema>;

export const TextElementConfigSchema = z.object({
  text: z.string(),
  color: z.string(),
  fontSize: z.string().default("16"),
  fontFamily: z.union([z.literal("Poppins"), z.literal("Roboto")]),
  fontWeight: z
    .union([
      z.literal("light"),
      z.literal("normal"),
      z.literal("medium"),
      z.literal("semibold"),
      z.literal("bold"),
      z.literal("black"),
    ])
    .default("normal"),
  letterSpacing: z.number(),
  lineHeight: z.number(),
  textAlign: z.union([z.literal("left"), z.literal("center"), z.literal("right")]).default("left"),
  textDecoration: z.union([z.literal("underline"), z.literal("line-throught"), z.literal("right")]),
  zIndex: z.number(),
});

export type TextElementConfig = z.infer<typeof TextElementConfigSchema>;

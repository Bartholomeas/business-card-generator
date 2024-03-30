import { z } from "zod";

export const TextElementHiddenSchema = z.record(z.boolean().default(false));
export type TextElementsHidden = z.infer<typeof TextElementHiddenSchema>;

export const TextElementConfigSchema = z.object({
  text: z.string().nullable(),
  color: z.string().nullable(),
  fontSize: z.number().default(16).nullable(),
  fontFamily: z.union([z.literal("Poppins"), z.literal("Roboto")]).default("Poppins"),
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
  letterSpacing: z.number().default(1.2).nullable(),
  lineHeight: z.number().default(1.5).nullable(),
  textAlign: z
    .union([z.literal("left"), z.literal("center"), z.literal("right"), z.literal("justify")])
    .default("left"),
  textDecoration: z
    .union([
      z.literal("default"),
      z.literal("underline"),
      z.literal("line-throught"),
      z.literal("right"),
    ])
    .default("default")
    .nullable(),
  isHidden: z.boolean().default(false),
  zIndex: z.number().default(0).nullable(),
});

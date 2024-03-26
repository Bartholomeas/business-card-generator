import { z } from "zod";
import { type Company } from "@prisma/client";
import { type userProfileSchema } from "./user-schemas";

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
  fontStyle: z.string().nullable(),
  positionX: z.number().nullable(),
  positionY: z.number().nullable(),
  letterSpacing: z.number(),
  lineHeight: z.number(),
  textAlign: z.union([z.literal("left"), z.literal("center"), z.literal("right")]).default("left"),
  textDecoration: z.union([z.literal("underline"), z.literal("line-throught"), z.literal("right")]),
  isHidden: z.boolean().default(false),
  zIndex: z.number(),
});

export interface UserProfile extends z.infer<typeof userProfileSchema> {
  email: string;
  avatarUrl: string | null;
}

export type TextAlign = "start" | "end" | "left" | "right" | "center" | "justify";

export type TextElementCodes = Exclude<
  keyof Company,
  "id" | "logoId" | "userId" | "userDetails" | "createdAt" | "updatedAt"
>;

export type TextElement = z.infer<typeof TextElementConfigSchema> & {
  id: string;
  code: TextElementCodes;
};
// export interface TextElement {
//   id: string;
//   text: string;

//   code?: TextElementCodes;

//   positionX?: number;
//   positionY?: number;

//   color?: string;

//   fontSize?: number;
//   fontFamily?: string;
//   fontWeight?: string;
//   fontStyle?: string;

//   textDecoration?: string;
//   textAlign?: TextAlign;
//   lineHeight?: number;
//   letterSpacing?: number;

//   isHidden?: boolean;

//   zIndex?: number;
// }

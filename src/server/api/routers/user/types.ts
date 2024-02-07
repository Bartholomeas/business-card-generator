import { type z } from "zod";
import { type Company } from "@prisma/client";
import { type userProfileSchema } from "./user-schemas";

export interface UserProfile extends z.infer<typeof userProfileSchema> {
  email: string;
  avatarUrl: string | null;
}

export type TextElementCodes = Exclude<
  keyof Company,
  "id" | "logoId" | "userId" | "userDetails" | "createdAt" | "updatedAt"
>;

export interface TextElement {
  id: string;
  text: string;

  code?: TextElementCodes;

  positionX?: number;
  positionY?: number;

  color?: string;

  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;

  textDecoration?: string;
  textAlign?: string;
  lineHeight?: number;
  letterSpacing?: number;

  isHidden?: boolean;

  zIndex?: number;
}

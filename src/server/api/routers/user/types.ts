import { type z } from "zod";
import { type userProfileSchema } from "./user-schemas";

export interface UserProfile extends z.infer<typeof userProfileSchema> {
  email: string;
  avatarUrl: string | null;
}

export interface TextElement {
  id: string;
  text: string;

  alias?: string;

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

  zIndex?: number;
}

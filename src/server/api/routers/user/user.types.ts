import { type z } from "zod";
import { type userProfileSchema } from "./user.schemas";
import { type TextElementConfigSchema } from "~/components/panel/card-wizard/edit-styles/helpers";
import { type Company } from "~/server/api/routers/company/company.types";

export interface UserProfile extends z.infer<typeof userProfileSchema> {
  email: string;
  userDetailsId?: string;
  // avatarUrl: string | null;
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

export interface UserBadge {
  id: string | null;
  name: string | null;
  avatar: {
    id: string;
    url: string;
  } | null;
}
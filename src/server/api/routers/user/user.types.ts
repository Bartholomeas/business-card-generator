import { type z } from "zod";
import { type Company as CompanyPrisma } from "@prisma/client";
import { type userProfileSchema } from "./user.schemas";
import { type TextElementConfigSchema } from "~/components/panel/card-wizard/edit-styles/helpers";
import { type userCompanySchema } from "~/server/api/routers/company/company.schemas";

export interface UserProfile extends z.infer<typeof userProfileSchema> {
  email: string;
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

export interface Company extends CompanyPrisma, z.infer<typeof userCompanySchema> {
  id: string;
  logoId: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
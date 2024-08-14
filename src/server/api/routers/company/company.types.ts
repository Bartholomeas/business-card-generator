import type { Company as CompanyPrisma } from "@prisma/client";
import type { z } from "zod";
import type { userCompanySchema } from "~/server/api/routers/company/company.schemas";

export interface Company extends CompanyPrisma, z.infer<typeof userCompanySchema> {
  id: string;
  slug: string;
  logoId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CompanyPageSectionTypes = "faqSection" | "opinionsSection" | "commentsSection";

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  userDetailsId: string;
}

export interface CommentsSection {
  id: string | undefined;
  title: string | undefined;
  items: Comment[] | undefined;
}

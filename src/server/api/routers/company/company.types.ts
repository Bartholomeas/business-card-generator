import { type api } from "~/trpc/server";

import { type userCompanySchema } from "./company.schemas";

import type { Company as CompanyPrisma } from "@prisma/client";
import type { z } from "zod";

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

export interface UserCompanyItem {
	id: string;
	slug: string;
	companyName: string | null;
	nip: string | null;
	logoId: string | null;
}

export type ServerGetCompanyPageSectionsVisibilityResponse = Awaited<
	ReturnType<typeof api.company.getCompanyPageSectionsVisibility.query>
>;

export interface VisibilityCompanySection {
	id: string;
	sectionType: CompanyPageSectionTypes;
	isVisible: boolean;
}

import {
	getAllCompanies,
	getCommentsSection,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
	addCompanyComment,
	deleteCompanyComment,
	setCompanyPageSectionVisibility,
	getCompanyPageSectionsVisibility,
} from "~/server/api/routers/company/requests";

import { createTRPCRouter } from "../../trpc";

export const companyRouter = createTRPCRouter({
	getAllCompanies,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
	getCommentsSection,
	getCompanyPageSectionsVisibility,
	addCompanyComment,
	deleteCompanyComment,
	setCompanyPageSectionVisibility,
});

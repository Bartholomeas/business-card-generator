import {
	addCompanyComment,
	deleteCompanyComment,
	getAllCompanies,
	getCommentsSection,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getCompanyPageSectionsVisibility,
	getFaqSection,
	getUserCompanies,
	getUserCompany,
	reorderCompanySections,
	setCompanyPageSectionVisibility,
} from "~/server/api/routers/company/requests";

import { createTRPCRouter } from "../../trpc";

export const companyRouter = createTRPCRouter({
	getAllCompanies,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
	getCommentsSection,
	getCompanyPageSectionsVisibility,
	getUserCompany,
	getUserCompanies,
	addCompanyComment,
	deleteCompanyComment,
	setCompanyPageSectionVisibility,
	reorderCompanySections,
});

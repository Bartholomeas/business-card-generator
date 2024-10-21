import {
	addCompanyComment,
	deleteCompanyComment,
	getAllCompanies,
	getCommentsSection,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getCompanyPageSectionsVisibility,
	getFaqSection,
	getUserCompany,
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
	addCompanyComment,
	deleteCompanyComment,
	setCompanyPageSectionVisibility,
});

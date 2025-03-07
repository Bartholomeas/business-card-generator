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
	createCompanyPage,
} from "~/server/api/routers/company/requests";

import { createTRPCRouter } from "../../trpc";
import { toggleCompanyPublish } from "./requests/toggle-company-publish";

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
	createCompanyPage,
	toggleCompanyPublish,
});

import {
	getAllCompanies,
	getCommentsSection,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
	addCompanyComment,
	deleteCompanyComment,
} from "~/server/api/routers/company/requests";

import { createTRPCRouter } from "../../trpc";

export const companyRouter = createTRPCRouter({
	getAllCompanies,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
	getCommentsSection,
	addCompanyComment,
	deleteCompanyComment,
});

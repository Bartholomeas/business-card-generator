import {
	addCompanyComment,
	deleteCompanyComment,
	getCommentsSection,
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
} from "~/server/api/routers/company/requests";

import { createTRPCRouter } from "../../trpc";

export const companyRouter = createTRPCRouter({
	getCompanyBySlug,
	getCompanyPageBySlug,
	getFaqSection,
	getCommentsSection,
	addCompanyComment,
	deleteCompanyComment,
});

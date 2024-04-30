import { createTRPCRouter } from "../../trpc";
import { getCompanyFaqSection, getCompanyPageBySlug } from "~/server/api/routers/company/requests";

export const companyRouter = createTRPCRouter({
  getCompanyPageBySlug,
  getCompanyFaqSection,
});
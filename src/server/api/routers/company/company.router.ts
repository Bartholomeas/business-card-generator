import { createTRPCRouter } from "../../trpc";
import { getCompanyPageBySlug } from "~/server/api/routers/company/requests";

export const companyRouter = createTRPCRouter({
  getCompanyPageBySlug,
});
import { createTRPCRouter } from "../../trpc";
import { getCompanyBySlug } from "~/server/api/routers/company/requests";

export const companyRouter = createTRPCRouter({
  getCompanyBySlug,
});
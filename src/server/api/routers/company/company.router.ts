import { createTRPCRouter } from "../../trpc";
import {
  getCompanyBySlug,
  getCompanyPageBySlug,
  getFaqSection,
} from "~/server/api/routers/company/requests";

export const companyRouter = createTRPCRouter({
  getCompanyBySlug,
  getCompanyPageBySlug,
  getFaqSection,
});
import { createTRPCRouter } from "../../trpc";
import {
  getCommentsSection,
  getCompanyBySlug,
  getCompanyPageBySlug,
  getFaqSection,
} from "~/server/api/routers/company/requests";

export const companyRouter = createTRPCRouter({
  getCompanyBySlug,
  getCompanyPageBySlug,
  getFaqSection,
  getCommentsSection,
});
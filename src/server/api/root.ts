import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { fileRouter } from "./routers/file";
import { cardRouter } from "./routers/card";
import { companyRouter } from "~/server/api/routers/company/company.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  user: userRouter,
  file: fileRouter,
  card: cardRouter,
  company: companyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
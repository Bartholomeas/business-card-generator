import { companyRouter } from "~/server/api/routers/company/company.router";
import { createTRPCRouter } from "~/server/api/trpc";

import { cardRouter } from "./routers/card";
import { fileRouter } from "./routers/file";
import { userRouter } from "./routers/user";

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

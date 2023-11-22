import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user/user";
import { fileRouter } from "./routers/file/file";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  user: userRouter,
  file: fileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

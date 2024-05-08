import { cache } from "react";
import { headers } from "next/headers";
import { createTRPCContext } from "~/server/api/trpc";
import { createCaller } from "~/server/api/root";

// export const api = createTRPCProxyClient<AppRouter>({
//   transformer,
//   links: [
//     loggerLink({
//       enabled: op =>
//         process.env.NODE_ENV === "development" ||
//         (op.direction === "down" && op.result instanceof Error),
//     }),
//     unstable_httpBatchStreamLink({
//       url: getUrl(),
//       headers() {
//         const heads = new Map(headers());
//         heads.set("x-trpc-source", "rsc");
//         return Object.fromEntries(heads);
//       },
//     }),
//   ],
// });
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({ headers: heads });
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const api = createCaller(createContext);

import React, { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { routes } from "~/routes/routes";
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/providers/trpc-provider";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();

  if (session) redirect(routes.home);

  return (
    <TRPCReactProvider headers={headers()}>
      <main className="container">{children}</main>
    </TRPCReactProvider>
  );
};

export default AuthLayout;

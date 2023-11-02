import React, { type ReactNode } from "react";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();
  console.log(session, "serwerowa sesja");

  return <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>;
};
export default PublicLayout;

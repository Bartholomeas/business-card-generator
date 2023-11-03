import React, { type ReactNode } from "react";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>;
};
export default PublicLayout;

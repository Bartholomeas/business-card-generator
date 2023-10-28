import "~/misc/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>;
}

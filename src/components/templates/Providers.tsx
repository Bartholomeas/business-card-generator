"use client";

import React, { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

export const Providers = ({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

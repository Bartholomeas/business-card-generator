"use client";

import React, { type PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

"use client";

import React, { type ReactNode } from "react";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export const SessionAppProvider = ({
	session,
	children,
}: {
	session: Session | null;
	children: ReactNode;
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

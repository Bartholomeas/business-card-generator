import React, { type ReactNode } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { TRPCReactProvider } from "~/providers/trpc-provider";
import { routes } from "~/routes/routes";
import { getServerAuthSession } from "~/server/auth";

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

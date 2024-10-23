import React, { type ReactNode } from "react";

import { redirect } from "next/navigation";


import { routes } from "~/routes/routes";
import { getServerAuthSession } from "~/server/auth";

import { PanelTemplate } from "~/components/layout/panel-template";

const UserPanelLayout = async ({ children }: { children: ReactNode; }) => {
  const session = await getServerAuthSession();

  if (!session) redirect(routes.home);

  return <PanelTemplate>{children}</PanelTemplate>;

};

export default UserPanelLayout;

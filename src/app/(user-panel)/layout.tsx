import React, { type ReactNode } from "react";
import { redirect } from "next/navigation";

import { Sidebar } from "~/components/panel/sidebar/sidebar";
import { getServerAuthSession } from "~/server/auth";
import { routes } from "~/misc/routes";

const UserPanelLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session) redirect(routes.home);

  return (
    <div className="hidden h-screen md:block">
      <div className="grid h-full border-t bg-background lg:grid-cols-5">
        <Sidebar />
        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelLayout;

import React, { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { routes } from "~/routes/routes";
import { PanelTemplate } from "~/components/layout/panel-template";

const UserPanelLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session) redirect(routes.home);

  return <PanelTemplate>{children}</PanelTemplate>;
  // <div className="h-[calc(100vh-64px)]">
  //   <div className="grid h-full border-t bg-background md:grid-cols-12">
  //     <div className="col-span-12 hidden md:col-span-3 md:block lg:col-span-2">
  //       <Sidebar />
  //     </div>
  //     <div className="col-span-12 md:col-span-9 md:border-l lg:col-span-10">
  //       <div className="h-full px-0 py-6 md:pl-4">
  //         <Suspense>{children}</Suspense>
  //       </div>
  //     </div>
  //   </div>
  // </div>
};

export default UserPanelLayout;
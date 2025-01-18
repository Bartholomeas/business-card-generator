import React, { type PropsWithChildren, Suspense } from "react";

import Loading from "~/app/loading";

import { Navbar } from "~/components/layout/navbar/navbar";
import { Sidebar } from "~/components/layout/sidebar";

export const PanelTemplate = ({ children }: PropsWithChildren) => (
  <div className="flex min-h-screen w-full flex-col overflow-hidden">
    <Navbar />
    <div className="flex flex-1">
      <div className="grid w-full bg-background-300 md:grid-cols-12">
        <div className="col-span-12 hidden md:col-span-3 md:block lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-12 pt-24 md:col-span-9 md:border-l lg:col-span-10">
          {/* <div className="px-2 py-6 md:pl-4"> */}
          <Suspense fallback={<Loading />}>{children}</Suspense>
          {/* </div> */}
        </div>
      </div>
    </div>
  </div>
);


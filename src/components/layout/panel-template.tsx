import React, { type PropsWithChildren, Suspense } from "react";

import { Navbar } from "~/components/layout/navbar/navbar";
import { Sidebar } from "~/components/layout/sidebar";

export const PanelTemplate = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen w-full">
    <Navbar />
    <div className="h-screen pt-[64px]">
      <div className="grid min-h-screen bg-background-300 md:grid-cols-12">
        <div className="col-span-12 hidden md:col-span-3 md:block lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l lg:col-span-10">
          <div className="h-full px-2 py-6 md:pl-4">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  </div>
);


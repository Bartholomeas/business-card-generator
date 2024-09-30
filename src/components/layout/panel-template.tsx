import React, { type PropsWithChildren, Suspense } from "react";
import { Sidebar } from "~/components/layout/sidebar";
import { Navbar } from "~/components/layout/navbar/navbar";

export const PanelTemplate = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen w-full">
    <Navbar />
    <div className="h-[calc(100vh-64px)] px-[1rem] pt-[64px]">
      <div className="grid h-full border-t bg-background md:grid-cols-12">
        <div className="col-span-12 hidden md:col-span-3 md:block lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l lg:col-span-10">
          <div className="h-full px-0 py-6 md:pl-4">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  </div>
);
// <div className="min-h-screen w-full">
//   <Navbar />
//   <main className="container mx-auto min-h-screen bg-background pt-16">{children}</main>
// </div>

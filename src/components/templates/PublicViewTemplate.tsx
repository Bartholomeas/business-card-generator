import React, { type PropsWithChildren } from "react";
import { Navbar } from "../common/navbar/navbar";

export const PublicViewTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="container mx-auto min-h-screen bg-background px-4 pt-16">
        {children}
      </main>
    </div>
  );
};

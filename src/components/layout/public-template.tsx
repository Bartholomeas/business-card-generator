import React, { type PropsWithChildren } from "react";
import { Navbar } from "./navbar/navbar";

export const PublicTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="container mx-auto min-h-screen bg-background pt-16">{children}</main>
    </div>
  );
};
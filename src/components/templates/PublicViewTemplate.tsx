import React, { type PropsWithChildren } from "react";
import { Navbar } from "../common/navbar/navbar";

export const PublicViewTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div className="mih-[100vh] w-full">
      <Navbar />
      <div className="min-h-screen bg-background pt-16">
        <p className="text-white">HEHEHE</p>
        {children}
      </div>
    </div>
  );
};

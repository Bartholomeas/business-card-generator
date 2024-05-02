import React from "react";
import { Navbar } from "./navbar/navbar";
import { cn } from "~/utils";

interface PublicTemplateProps {
  children?: React.ReactNode;
  className?: string;
}

export const PublicTemplate = ({ children, className }: PublicTemplateProps) => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className={cn("container mx-auto min-h-screen bg-background pt-16", className)}>
        {children}
      </main>
    </div>
  );
};
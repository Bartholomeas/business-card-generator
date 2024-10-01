import React from "react";

import { cn } from "~/utils";

import { Footer } from "./footer";
import { Navbar } from "./navbar/navbar";


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
			<Footer />
		</div>
	);
};

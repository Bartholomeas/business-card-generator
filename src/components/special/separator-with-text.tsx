import React, { type PropsWithChildren } from "react";

export const SeparatorWithText = ({ children }: PropsWithChildren) => {
	return (
		<div className="relative">
			<div className="absolute inset-0 flex items-center">
				<span className="w-full border-t" />
			</div>
			<div className="relative flex justify-center text-xs uppercase">
				<span className="bg-background px-2 text-muted-foreground">{children}</span>
			</div>
		</div>
	);
};

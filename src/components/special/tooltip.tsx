"use client";

import React from "react";

import { type TooltipProps } from "@radix-ui/react-tooltip";

import {
	Tooltip as UiTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/common/tooltip";

interface Props extends TooltipProps {
	label: string;
}

export const Tooltip = ({ label, children, ...props }: Props) => {
	return (
		<TooltipProvider>
			<UiTooltip {...props}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>{label}</TooltipContent>
			</UiTooltip>
		</TooltipProvider>
	);
};

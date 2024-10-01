import React, { isValidElement, type ReactElement } from "react";

import { CircleSlash, type LucideIcon } from "lucide-react";

import { Button, type ButtonProps } from "~/components/common";

import { Tooltip } from "./tooltip";

import { cn } from "~/utils";

interface Props extends Omit<ButtonProps, "children"> {
	children: ReactElement<LucideIcon>;
	label?: string;
	square?: boolean;
	className?: string;
}

export const ActionIcon = ({ label, square = true, className, children, ...props }: Props) => {
	const Icon = isValidElement<LucideIcon>(children) ? children : <CircleSlash />;

	return (
		<Tooltip label={label ?? ""}>
			<Button
				type="button"
				className={cn("p-1", className, { "aspect-square": square })}
				{...props}
			>
				{Icon}
			</Button>
		</Tooltip>
	);
};

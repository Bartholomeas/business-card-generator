import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

export const headingVariants = cva("", {
	variants: {
		type: {
			// Heading sizes
			h1: "h1",
			h2: "h2",
			h3: "h3",
			h4: "h4",
			h5: "h5",
			h6: "h6",
		},
		size: {
			h1: "h1",
			h2: "h2",
			h3: "h3",
			h4: "h4",
			h5: "h5",
			h6: "h6",
		},
		color: {
			default: "text-primary",
			secondary: "text-secondary",
			white: "text-white",
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
		},
		align: {
			left: "text-left",
			right: "text-right",
			center: "text-center",
			justify: "text-justify",
		},
	},

	defaultVariants: {
		type: "h2",
		weight: "semibold",
		color: "default",
		align: "left",
	},
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
	children: React.ReactNode;
	className?: string;
}

// Size property just changes size visually, heading property is handling semantic heading tag
export const Heading = ({
	type,
	weight,
	color,
	size,
	align,
	className,
	children,
}: HeadingProps) => {
	const Component = type ?? "h2";
	return (
		<Component className={headingVariants({ type: size ?? type, weight, color, align, className })}>
			{children}
		</Component>
	);
};

import React from "react";

import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva("", {
	variants: {
		size: {
			lg: "text-lg leading-[28px]", //18px
			md: "text-md leading-[24px]", //16px
			sm: "text-sm leading-[20px]", // 14px
			xs: "text-xs leading-[20px]", //13px
			xxs: "text-xxs leading-[17px]", //12px
			xxxs: "text-xxxs leading-[15px]", //11px
			// Other
			overline: "text-sm leading-[12px]",
			// Heading sizes
			h1: "h1",
			h2: "h2",
			h3: "h3",
			h4: "h4",
			h5: "h5",
			h6: "h6",
		},
		color: {
			primary: "text-textPrimary",
			secondary: "text-textSecondary",
			success: "text-success-600",
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
		decorations: {
			default: "",
			underline: "underline",
		},
	},

	defaultVariants: {
		size: "md",
		weight: "normal",
		color: "primary",
		align: "left",
		decorations: "default",
	},
});

type TextVariantProps = VariantProps<typeof textVariants>;

export interface TextProps
	extends TextVariantProps,
		Omit<React.HTMLAttributes<HTMLSpanElement>, keyof TextVariantProps> {
	children?: React.ReactNode;
	className?: string;
	as?: "span" | "p";
}

export const Text = ({
	size,
	weight,
	color,
	decorations,
	align,
	as = "p",
	className,
	children,
	...props
}: TextProps) => {
	const Component = as;
	return (
		<Component
			{...props}
			className={textVariants({ size, weight, align, color, decorations, className })}
		>
			{children}
		</Component>
	);
};

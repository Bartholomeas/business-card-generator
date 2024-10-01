"use client";

import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

export const labelVariants = cva(
	"font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
	{
		variants: {
			size: {
				default: "text-sm",
				xxs: "text-xxs",
			},
			color: {
				default: "text-textSecondary",
			},
			defaultValues: {
				size: "default",
				color: "default",
			},
		},
	},
);

export type LabelVariantsProps = VariantProps<typeof labelVariants>;
const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & LabelVariantsProps
>(({ className, size, color, ...props }, ref) => (
	<LabelPrimitive.Root ref={ref} className={labelVariants({ size, color, className })} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

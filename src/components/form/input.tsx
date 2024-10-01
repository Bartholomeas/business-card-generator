"use client";

import { type ChangeEvent, forwardRef, useCallback } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { type ControllerRenderProps, type FieldValues, useFormContext } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";

import { cn } from "~/utils";


export const inputVariants = cva(
	"flex w-full rounded-md border border-border bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			size: {
				default: "h-12 px-3 py-1",
				small: "h-9 px-2 py-1",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
	VariantProps<typeof inputVariants>;

const _Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, size, ...props }, ref) => (
		<input type={type} className={inputVariants({ size, className })} ref={ref} {...props} />
	),
);

_Input.displayName = "Input";

export interface InputControlledProps extends InputProps {
	name: string;
	label?: string;
	description?: string;
	labelClassName?: string;
}

export const Input = ({
	name,
	label,
	description,
	labelClassName,
	className,
	...props
}: InputControlledProps) => {
	const { control } = useFormContext();

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FieldValues, string>) => {
			return props.type === "number"
				? field?.onChange?.(+e.target.value)
				: field?.onChange?.(e.target.value);
		},
		[],
	);

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className={cn(className, "w-full")}>
					<FormLabel size="xxs" className={labelClassName}>
						{label}
					</FormLabel>
					<FormControl>
						<_Input
							{...field}
							{...props}
							type={props.type ?? "text"}
							onChange={e => handleChange(e, field)}
						/>
					</FormControl>
					<FormMessage />
					{description ? <FormDescription>{description}</FormDescription> : null}
				</FormItem>
			)}
		/>
	);
};

"use client";

import React from "react";

import { type CheckboxProps } from "@radix-ui/react-checkbox";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "~/components/common/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "~/components/form/form";

interface Props extends CheckboxProps {
	label?: string | React.ReactNode;
	name: string;
}

export const CheckboxInput = ({ label, name, onCheckedChange, ...props }: Props) => {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className="flex flex-row items-center gap-2">
					<FormControl>
						<Checkbox
							{...props}
							{...field}
							checked={field.value as boolean}
							onCheckedChange={(e: boolean) => {
								field.onChange(e);
								onCheckedChange?.(e);
							}}
						/>
					</FormControl>
					<FormLabel>{label}</FormLabel>
				</FormItem>
			)}
		/>
	);
};

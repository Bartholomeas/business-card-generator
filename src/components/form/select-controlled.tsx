"use client";

import { type SelectProps } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

import {
	Select,
	SelectContent,
	SelectItem,
	type SelectItemProps,
	SelectTrigger,
	SelectValue,
} from "~/components/common";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/form/form";

export interface SelectControlledProps extends SelectProps {
	name: string;
	items: SelectItemProps[];
	placeholder: string;
	label?: string;
	description?: string;
	labelClassName?: string;
}

export const SelectControlled = ({
	name,
	label,
	placeholder,
	description,
	labelClassName,
	items,
	...props
}: SelectControlledProps) => {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormLabel size="xxs" className={labelClassName}>
						{label}
					</FormLabel>
					{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
					<Select {...field} defaultValue={field.value} onValueChange={field.onChange} {...props}>
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{items.map(item => (
								<SelectItem key={item.value} {...item}>
									{item.children}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{description ? <FormDescription> {description}</FormDescription> : null}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

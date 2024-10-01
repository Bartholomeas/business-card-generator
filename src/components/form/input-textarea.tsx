"use client";

import { useState } from "react";

import { useFormContext } from "react-hook-form";

import { Textarea, type TextareaProps } from "~/components/common/textarea";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/form/form";

import { cn } from "~/utils";

interface Props extends TextareaProps {
	label?: string;
	description?: string;
	name: string;
	labelSrOnly?: boolean;
	maxLength?: number;
}

export const InputTextarea = ({
	name,
	label,
	description,
	labelSrOnly = false,
	maxLength,
	...props
}: Props) => {
	const { control } = useFormContext();
	const [characterCount, setCharacterCount] = useState(0);

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel className={cn({ "sr-only": labelSrOnly })}>{label}</FormLabel>
					<FormControl>
						<Textarea
							{...field}
							{...props}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
								field.onChange?.(e);
								props.onChange?.(e);

								setCharacterCount(e.target.value?.length ?? 0);
							}}
						/>
					</FormControl>
					<FormMessage />
					{description ? <FormDescription>{description}</FormDescription> : null}
					{maxLength ? (
						<div className="mt-2 text-right text-xxs text-neutral-400">
							{characterCount}/{maxLength}
						</div>
					) : null}
				</FormItem>
			)}
		/>
	);
};

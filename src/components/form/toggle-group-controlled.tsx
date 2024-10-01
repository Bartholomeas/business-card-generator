"use client";

import { useFormContext } from "react-hook-form";

import { ToggleGroup, ToggleGroupItem } from "../common";
import { FormControl, FormField, FormItem, FormLabel } from "./form";

interface ToggleItem {
	label: string | React.ReactNode;
	value: string;
	ariaLabel?: string;
}

export interface ToggleGroupControlledProps {
	label: string;
	name: string;
	items: ToggleItem[];
}

export const ToggleGroupControlled = ({ label, name, items }: ToggleGroupControlledProps) => {
	const { control } = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel size="xxs">{label}</FormLabel>
					<FormControl>
						<ToggleGroup
							type="single"
							{...field}
							onValueChange={e => {
								field?.onChange(e);
							}}
						>
							{items.map((item, index) => (
								<ToggleGroupItem
									key={`${item.value}-${index}`}
									aria-label={item.ariaLabel ?? JSON.stringify(item.label)}
									value={item.value}
								>
									{item.label}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</FormControl>

					{/* {items.map(item => {
            return (
              <FormItem key={item.label}>
                <FormControl>
                  <FormLabel>
                    <Toggle {...item}>{item.label}</Toggle>
                  </FormLabel>
                </FormControl>
              </FormItem>
            );
          })} */}
				</FormItem>
			)}
		/>
	);
};

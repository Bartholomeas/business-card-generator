"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input, type InputProps } from "~/components/ui/input";

interface Props extends InputProps {
  label?: string;
  name: string;
}

export const InputWithLabel = ({ name, label, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} type={props.type ?? "text"} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

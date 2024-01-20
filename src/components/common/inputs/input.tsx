"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input as UiInput,
  type InputProps,
} from "~/components/common/ui";

interface Props extends InputProps {
  name: string;
  label?: string;
  description?: string;
}

export const Input = ({ name, label, description, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <UiInput {...field} {...props} type={props.type ?? "text"} />
          </FormControl>
          <FormMessage />
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
};

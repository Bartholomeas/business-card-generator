"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form/form";

import { Textarea, type TextareaProps } from "~/components/common/textarea";

interface Props extends TextareaProps {
  label?: string;
  description?: string;
  name: string;
}

export const InputTextarea = ({ name, label, description, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
          {description ? <FormDescription>{description}</FormDescription> : null}
        </FormItem>
      )}
    />
  );
};

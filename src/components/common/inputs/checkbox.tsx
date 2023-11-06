"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type CheckboxProps } from "@radix-ui/react-checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";

interface Props extends CheckboxProps {
  label?: string;
  name: string;
}

export const CheckboxInput = ({ label, name, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center gap-2">
          <FormControl>
            <Checkbox
              {...field}
              {...props}
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};

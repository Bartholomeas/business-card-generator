"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Toggle, type ToggleProps } from "../common";

interface ToggleControlledProps extends ToggleProps {
  name: string;
  label?: string;
  description?: string;
  labelClassName?: string;
}

const ToggleControlled = ({
  name,
  label,
  description,
  labelClassName,
  children,
  ...props
}: ToggleControlledProps) => {
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
          <FormControl>
            <Toggle {...field} {...props}>
              {children}
            </Toggle>
          </FormControl>
          <FormMessage />
          {description ? <FormDescription>{description}</FormDescription> : null}
        </FormItem>
      )}
    ></FormField>
  );
};

export { ToggleControlled };

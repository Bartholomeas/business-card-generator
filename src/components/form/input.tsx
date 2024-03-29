"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";

import { cn } from "~/utils";

const _Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
_Input.displayName = "Input";

export interface InputControlledProps extends InputProps {
  name: string;
  label?: string;
  description?: string;
}

export const Input = ({ name, label, description, ...props }: InputControlledProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <_Input {...field} {...props} type={props.type ?? "text"} />
          </FormControl>
          <FormMessage />
          {description ? <FormDescription>{description}</FormDescription> : null}
        </FormItem>
      )}
    />
  );
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

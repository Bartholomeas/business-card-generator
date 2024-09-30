"use client";

import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { type InputProps, inputVariants } from "./input";

export const InputColorPure = forwardRef<HTMLInputElement, InputColorProps>(
  ({ label, size = "small", ...props }, ref) => {
    return (
      <div
        className={inputVariants({
          size,
          className:
            "cursor-pointer items-center justify-start gap-2 rounded-sm rounded-l-full border border-border p-2 pr-3",
        })}
      >
        <div
          className={
            "aspect-square size-[18px] cursor-pointer overflow-hidden rounded-full border-0"
          }
          style={{ backgroundColor: props?.value ? props.value.toString() : "#333" }}
        >
          <input
            className="size-full cursor-pointer opacity-0"
            type="color"
            aria-label={label ?? "Wybierz kolor"}
            ref={ref}
            defaultValue={"#333"}
            {...props}
          />
        </div>
        {props.value}
      </div>
    );
  },
);
InputColorPure.displayName = "InputColorPure";

export interface InputColorProps extends InputProps {
  name: string;
  label?: string;
}

export const InputColor = ({ name, label, ...props }: InputColorProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel size="xxs">{label}</FormLabel>
          <FormControl>
            <InputColorPure label={label} {...props} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
"use client";

import { type ChangeEvent, forwardRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { debounce } from "~/utils/debounce";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import { type InputProps } from "./input";

export const InputColorPure = forwardRef<HTMLInputElement, Props>(({ ...props }, ref) => {
  const [value, setValue] = useState("#fff");

  const setChoosenColorValue = (event: ChangeEvent<HTMLInputElement>) =>
    debounce(() => {
      setValue(event.target.value);
    });

  return (
    <div
      className={
        "flex w-full cursor-pointer items-center justify-start gap-2 rounded-sm rounded-l-full border border-border p-2 pr-3"
      }
    >
      <div
        className={
          "aspect-square h-[18px] w-[18px] cursor-pointer overflow-hidden rounded-full border-0"
        }
        style={{ backgroundColor: value }}
      >
        <input
          className="h-full w-full cursor-pointer opacity-0"
          type="color"
          onChange={setChoosenColorValue}
          value={value}
          ref={ref}
          {...props}
        />
      </div>
      {value}
    </div>
  );
});
InputColorPure.displayName = "InputColorPure";

interface Props extends InputProps {
  name: string;
  label?: string;
}

export const InputColor = ({ name, label }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputColorPure label={label} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

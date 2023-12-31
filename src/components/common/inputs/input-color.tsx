"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { debounce } from "~/misc/utils/debounce";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  type InputProps,
} from "~/components/ui";

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

export const InputColorPure = ({ ...props }: Props) => {
  const [value, setValue] = useState("#fff");

  const setChoosenColorValue = debounce((value: string) => {
    setValue(value);
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
          onChange={(e) => setChoosenColorValue(e.target.value)}
          value={value}
          {...props}
        />
      </div>
      {value}
    </div>
    // </Label>
  );
};

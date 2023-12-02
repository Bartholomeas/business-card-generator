"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { debounce } from "~/misc/utils/debounce";
import { Label } from "~/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  type InputProps,
} from "~/components/ui";

interface Props extends InputPureProps {
  name: string;
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

interface InputPureProps extends InputProps {
  label?: string;
}
export const InputColorPure = ({ label, ...props }: InputPureProps) => {
  const [value, setValue] = useState("#fff");

  const setChoosenColorValue = debounce((value: string) => {
    setValue(value);
  });

  return (
    // <Label className="flex cursor-pointer flex-col gap-2">
    //   {label}
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

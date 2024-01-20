"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { debounce } from "~/misc/utils/debounce";
<<<<<<< HEAD:src/components/common/form/input-color.tsx
import { InputProps } from "./input";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
=======

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  type InputProps,
} from "~/components/common/ui";
>>>>>>> 9c4b6ace354252660b60fa83502ac49704afdd43:src/components/common/inputs/input-color.tsx

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

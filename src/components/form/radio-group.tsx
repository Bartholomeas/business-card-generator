"use client";

import { useFormContext } from "react-hook-form";
import { type RadioGroupProps } from "@radix-ui/react-radio-group";
import { RadioGroup, RadioGroupItem } from "../common";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from ".";

interface Props extends RadioGroupProps {
  label?: string;
  description?: string;
  name: string;
}

export function RadioGroupForm({ name, label, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label ? <FormLabel>{label}</FormLabel> : null}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              {...props}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel className="font-normal">{label}</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="mentions" />
                </FormControl>
                <FormLabel className="font-normal">Direct messages and mentions</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel className="font-normal">Nothing</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

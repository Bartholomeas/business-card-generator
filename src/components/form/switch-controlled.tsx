"use client";

import { type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form/form";
import { Switch, type SwitchProps, textVariants } from "~/components/common";
import { cn } from "~/utils";

interface SwitchControlledProps extends SwitchProps {
  name: string;
  label: string;
  description?: string | ReactNode;
  srOnly?: boolean;
}

const SwitchControlled = ({
  name,
  label,
  description,
  srOnly = false,
  ...props
}: SwitchControlledProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className={"flex w-full items-center justify-between gap-2"}>
            <FormLabel
              className={textVariants({
                size: "sm",
                weight: "semibold",
                className: cn({ "sr-only": srOnly }),
              })}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Switch checked={!!field?.value} onCheckedChange={field.onChange} {...props} />
            </FormControl>
          </div>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export { SwitchControlled };

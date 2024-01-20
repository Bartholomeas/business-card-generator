"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
<<<<<<< HEAD:src/components/common/form/input-textarea.tsx
} from "~/components/common/form/form";
=======
} from "~/components/common/ui/form";
>>>>>>> 9c4b6ace354252660b60fa83502ac49704afdd43:src/components/common/inputs/input-textarea.tsx

import { Textarea, type TextareaProps } from "~/components/common/ui/textarea";

interface Props extends TextareaProps {
  label?: string;
  name: string;
}

export const InputTextarea = ({ name, label, ...props }: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

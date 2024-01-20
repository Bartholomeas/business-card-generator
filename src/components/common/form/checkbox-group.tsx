"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
<<<<<<< HEAD:src/components/common/form/checkbox-group.tsx
} from "./form";
import { Checkbox } from "../ui";
=======
} from "~/components/common/ui";
>>>>>>> 9c4b6ace354252660b60fa83502ac49704afdd43:src/components/common/inputs/checkbox-group.tsx

interface SingleCheckbox {
  label: string;
  value: string | number;
}

interface Props {
  label: string;
  name: string;
  items: readonly SingleCheckbox[];
}

export function CheckboxGroup({ label, name, items }: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="mb-2 text-xs">{label}</FormLabel>
          {items.map((item) => (
            <FormField
              key={item.label}
              control={control}
              name="items"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.label}
                    className="flex flex-row items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        onCheckedChange={(checked) => {
                          console.log({ checked, field });
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

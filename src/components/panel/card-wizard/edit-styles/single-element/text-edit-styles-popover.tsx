"use client";

import React, { type PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common/ui";
import { Form, Input, InputColorPure, Label } from "~/components/common/form";

const textElementSchema = z.object({
  fontSize: z.number().default(14),
});

export const TextEditStylesPopover = ({ children }: PropsWithChildren) => {
  const form = useForm<z.infer<typeof textElementSchema>>({
    resolver: zodResolver(textElementSchema),
    defaultValues: {},
  });

  return (
    <Popover>
      <PopoverTrigger className="relative rounded-sm border border-slate-200 after:absolute after:content-[''] hover:border-slate-400">
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form
            onSubmit={() =>
              form.handleSubmit(() => {
                console.log("xd");
              })
            }
            className="grid gap-4"
          >
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Rozmiar</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            <div className="flex flex-col gap-0">
              <Label>Rozmiar</Label>
              <Input name="text-size" id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="flex flex-col gap-0">
              <Label>Kolor</Label>
              <InputColorPure name="text-color" />
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import React, { type PropsWithChildren } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { type TextElementCodes } from "~/server/api/routers/user";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common/ui";
import { Form, Input, InputColor, Label } from "~/components/common/form";
import { Autosubmit } from "~/components/common/special";

const textElementSchema = z.object({
  fontSize: z.string().default("14"),
  color: z.string().default("#000000"),
});

interface TextEditStylesPopoverProps extends PropsWithChildren {
  code?: TextElementCodes;
}

export const TextEditStylesPopover = ({ code, children }: TextEditStylesPopoverProps) => {
  const form = useForm<z.infer<typeof textElementSchema>>({
    resolver: zodResolver(textElementSchema),
    defaultValues: {},
  });

  const onSubmit = () => {
    console.log("submit single popover", code);
  };

  return (
    <Popover>
      <PopoverTrigger className="relative rounded-sm border border-slate-200 after:absolute after:content-[''] hover:border-slate-400">
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Rozmiar</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            <div className="flex flex-col gap-0">
              <Label>Rozmiar</Label>
              <Input type="number" name="fontSize" id="width" className="col-span-2 h-8" />
            </div>
            <div className="flex flex-col gap-0">
              <Label>Kolor</Label>
              <InputColor name="color" />
            </div>
            <Autosubmit />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

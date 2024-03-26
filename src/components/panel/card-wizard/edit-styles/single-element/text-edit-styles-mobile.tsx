"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { useCardStylesStore } from "~/stores/card";
import { TextElementConfigSchema, textElementConfigInputs } from "../helpers";
import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common";
import { Autosubmit, Form, Input } from "~/components/form";
import { TextEditTrigger } from "./text-edit-trigger";

export interface TextEditStylesMobileProps {
  children?: React.ReactNode;
  textEl?: TextElement;
  code?: TextElementCodes;
  label?: React.ReactNode;
  className?: string;
}
export const TextEditStylesMobile = ({ textEl, code, label }: TextEditStylesMobileProps) => {
  const form = useForm<z.infer<typeof TextElementConfigSchema>>({
    resolver: zodResolver(TextElementConfigSchema),
    defaultValues: {},
  });

  const { getTextElementByCode } = useCardStylesStore();
  const { id, text } = getTextElementByCode(code);

  const onSubmit = () => {
    console.log("submit single popover", code);
  };

  if (!textEl?.text && !text) return null;

  return (
    <Popover>
      <PopoverTrigger asChild key={id}>
        <TextEditTrigger code={code} content={label} />
      </PopoverTrigger>
      <PopoverContent className="max-h-[300px] w-80 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Rozmiar</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            {textElementConfigInputs
              ? textElementConfigInputs.map(input => <Input key={input.name} {...input} />)
              : null}
            <Autosubmit />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Slot } from "@radix-ui/react-slot";
import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/common/ui";
import { Form, Input, InputColor, Label } from "~/components/common/form";
import { Autosubmit } from "~/components/common/special";
import { useCardStylesStore } from "~/stores/card";
import { cn } from "~/misc";

const textElementSchema = z.object({
  text: z.string(),
  // positonX: z.number(),
  // postionY: z.number(),
  color: z.string(),
  fontSize: z.string(),
  lineHeight: z.number(),
  letterSpacing: z.number(),
  // fontSize: z.string(),
});

interface TextEditStylesPopoverProps {
  children?: React.ReactNode;
  textEl?: TextElement;
  code?: TextElementCodes;
  className?: string;
}

export const TextEditStylesPopover = ({ textEl, code, className }: TextEditStylesPopoverProps) => {
  const form = useForm<z.infer<typeof textElementSchema>>({
    resolver: zodResolver(textElementSchema),
    defaultValues: {},
  });

  const { getTextElementByCode } = useCardStylesStore();
  const {
    id,
    text,
    fontSize,
    color,
    fontFamily,
    fontStyle,
    fontWeight,
    isHidden,
    letterSpacing,
    lineHeight,
    // positionX,
    // positionY,
    textAlign,
    textDecoration,
    zIndex,
  } = getTextElementByCode(code);

  const onSubmit = () => {
    console.log("submit single popover", code);
  };

  return (
    <Popover>
      <PopoverTrigger
        key={id}
        className="relative rounded-sm border border-slate-200 after:absolute after:content-[''] hover:border-slate-400"
      >
        {textEl ? (
          <Slot>{textEl.text}</Slot>
        ) : (
          <p
            style={{
              fontSize,
              color,
              fontFamily,
              fontStyle,
              fontWeight,
              letterSpacing,
              lineHeight,
              textAlign,
              textDecoration,
              zIndex,
            }}
            className={cn(className, {
              hidden: isHidden,
              // positionX,
              // positionY,
            })}
          >
            {text}
          </p>
        )}
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

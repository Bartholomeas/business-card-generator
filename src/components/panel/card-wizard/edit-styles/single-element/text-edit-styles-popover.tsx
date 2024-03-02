"use client";

import React, { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "~/utils";
import { useCardStylesStore } from "~/stores/card";

import { type TextElement, type TextElementCodes } from "~/server/api/routers/user";

import { Popover, PopoverContent, PopoverTrigger, Text } from "~/components/common";
import { Autosubmit, Form, InputControlled } from "~/components/form";
import { TextElementConfigSchema } from "../helpers";

interface TextEditStylesPopoverProps {
  children?: React.ReactNode;
  textEl?: TextElement;
  code?: TextElementCodes;
  label?: React.ReactNode;
  className?: string;
}

export const TextEditStylesPopover = ({
  textEl,
  code,
  label,
  className,
}: TextEditStylesPopoverProps) => {
  const form = useForm<z.infer<typeof TextElementConfigSchema>>({
    resolver: zodResolver(TextElementConfigSchema),
    defaultValues: {},
  });

  const { getTextElementByCode } = useCardStylesStore();

  const {
    id,
    text,
    fontSize,
    color,
    fontFamily,
    // fontStyle,
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

  const updateDefaultValues = useCallback(() => {
    return form.reset({
      text,
      fontSize,
      color,
      fontFamily,
      // fontStyle,
      fontWeight,
      // isHidden,
      letterSpacing,
      lineHeight,
      // positionX,
      // positionY,
      textAlign,
      textDecoration,
      zIndex,
    });
  }, [text]);

  useEffect(() => {
    updateDefaultValues();
    console.log("xdd");
  }, []);

  const onSubmit = () => {
    console.log("submit single popover", code);
  };

  if (!textEl?.text && !text) return null;

  return (
    <Popover>
      <PopoverTrigger
        key={id}
        className="relative rounded-sm border border-slate-200 after:absolute after:content-[''] hover:border-slate-400 "
      >
        {textEl ? (
          <Slot>{textEl.text}</Slot>
        ) : (
          <p
            style={{
              fontSize,
              color,
              fontFamily,
              // fontStyle,
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
            {label ?? null}
            {text}
          </p>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <Text>Edytuj element</Text>

            <InputControlled name="text" label="Tekst" />
            <InputControlled name="color" label="Kolor" />
            <InputControlled name="fontSize" label="Rozmiar tekstu" type="number" />
            {/* select */}
            <InputControlled name="fontFamily" label="Krój pisma" />
            <InputControlled name="fontWeight" label="Waga pisma" />
            <InputControlled name="letterSpacing" label="Odstępy między znakami" />
            <InputControlled name="Wysokość linii" label="Odstępy między znakami" />
            {/* Three controls with align */}
            <InputControlled name="textAlign" label="ALIGN" />
            {/* Controls with decorations like underline, italic etc */}
            <InputControlled name="textDecoration" label="DEKORACJE" />
            {/* maybe remove zindex? */}
            <InputControlled name="zIndex" label="Kolejność" type="number" />

            {/* {textElementConfigInputs
              ? textElementConfigInputs.map(input => (
                  <InputControlled key={input.name} {...input} />
                ))
              : null} */}
            <Autosubmit />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

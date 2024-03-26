"use client";

import React, { useEffect } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TextElementConfigSchema, textElementConfigInputs } from "../helpers";
import { useCardStylesStore } from "~/stores/card";

import { CheckboxGroup, Form, Input, InputColor } from "~/components/form";
import { useToast } from "~/components/common";
import { ActionIcon } from "~/components/special/action-icon";

import { ToggleTextForm } from "./toggle-text-form";

import { ToggleGroupControlled } from "~/components/form/toggle-group-controlled";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

// const TextElementsSchema = z.record(z.boolean().default(false));

export const PersonalizeText = () => {
  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: {},
    resolver: zodResolver(TextElementConfigSchema),
  });

  const { getChoosenElement } = useCardStylesStore();
  const {
    id,
    text,
    color,
    fontSize,
    fontFamily,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecoration,
    zIndex,
  } = getChoosenElement() ?? {};

  useEffect(() => {
    methods.reset({
      text,
      color: color ?? undefined,
      fontSize,
      fontFamily: fontFamily ?? undefined,
      fontWeight,
      letterSpacing,
      lineHeight,
      textAlign,
      textDecoration,
      zIndex,
    });
  }, [id]);

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof TextElementConfigSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="mt-8">
      <ToggleTextForm />
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            {textAligns.map(item => (
              <ActionIcon
                key={`textAlignActionIcon-${item.label}`}
                label={item.label}
                onClick={() => {
                  console.log(methods.getValues());
                  item.onClick();
                }}
                variant="outline"
              >
                {item.icon}
              </ActionIcon>
            ))}
          </div>
          <Input name="fontSize" label="Rozmiar tekstu" type="number" defaultValue={16} />
          <InputColor name="fontColor" label="Kolor tekstu" />
          <CheckboxGroup name="textDecoration" label="Nagłówek" items={textDecorations} />
          {textElementConfigInputs
            ? textElementConfigInputs.map(input => <Input key={input.name} {...input} />)
            : null}
          <ToggleGroupControlled
            name="textAlign"
            label="test"
            items={[
              {
                label: "Do lewej",
                value: "left",
              },
              {
                label: "Do prawej",
                value: "right",
              },
            ]}
          />
          {/* <ToggleControlled name="textAlign">xd</ToggleControlled> */}
        </form>
      </Form>
    </div>
  );
};

const textDecorations = [
  {
    label: "Bold",
    value: "bold",
  },
  {
    label: "Italic",
    value: "italic",
  },
  {
    label: "Underline",
    value: "underline",
  },
] as const;

const textAligns = [
  {
    label: "Do lewej",
    onClick: () => {
      console.log("justify");
    },
    icon: <AlignLeft size={16} />,
  },
  {
    label: "Centruj",
    onClick: () => {
      console.log("justify");
    },
    icon: <AlignCenter size={16} />,
  },
  {
    label: "Do prawej",
    onClick: () => {
      console.log("justify");
    },
    icon: <AlignRight size={16} />,
  },
  {
    label: "Justuj",
    onClick: () => {
      console.log("justify");
    },
    icon: <AlignJustify size={16} />,
  },
] as const;

"use client";

import React, { useEffect } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type ControlledInputElements,
  textElementConfigInputs,
  TextElementConfigSchema,
} from "../helpers";
import { useCardStylesStore } from "~/stores/card";

import { Autosubmit, Form, Input, InputColor } from "~/components/form";

import { ActionIcon } from "~/components/special/action-icon";
import {
  ToggleGroupControlled,
  type ToggleGroupControlledProps,
} from "~/components/form/toggle-group-controlled";

import { ToggleTextForm } from "./toggle-text-form";

import { api } from "~/providers/trpc-provider";
import { parseObjectUndefinedToNulls } from "~/utils";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export const PersonalizeText = () => {
  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: { text: "" },
    resolver: zodResolver(TextElementConfigSchema),
  });
  const { mutate } = api.card.updateTextElement.useMutation();

  const { getChoosenElement, updateTextElement } = useCardStylesStore();

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

  function onSubmit(data: z.infer<typeof TextElementConfigSchema>) {
    updateTextElement(data);
    // if (id) mutate({ id, ...data });
  }

  return (
    <div className="mt-8">
      <ToggleTextForm />
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <button
              type={"button"}
              onClick={() => {
                console.log(getChoosenElement());
                // if (id) mutate(parseObjectUndefinedToNulls({ id, ...getChoosenElement() }));
                const xd = { id, ...getChoosenElement() };
                console.log({ xd, hyhy: parseObjectUndefinedToNulls(xd) });

                // console.log({ id });
                // mutate({ id, ...methods.getValues() });
                // console.log({ id, ...methods.getValues() });
              }}
            >
              Mutuj to
            </button>
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
          {/* <Input name="fontSize" label="Rozmiar tekstu" type="number" defaultValue={16} />
          <InputColor name="fontColor" label="Kolor tekstu" />
          <CheckboxGroup name="textDecoration" label="Nagłówek" items={textDecorations} /> */}
          {textElementConfigInputs
            ? textElementConfigInputs.map(input => returnCorrectInputType(input.inputType, input))
            : null}

          <Autosubmit />
        </form>
      </Form>
    </div>
  );
};

const returnCorrectInputType = (
  inputType: ControlledInputElements["inputType"],
  props: Omit<ControlledInputElements, "inputType">,
) => {
  switch (inputType) {
    case "color":
      return <InputColor {...props} />;
    case "input":
      return <Input {...props} />;
    case "toggle-group":
      return <ToggleGroupControlled {...(props as ToggleGroupControlledProps)} />;
    default:
      return <Input {...props} />;
  }
};

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

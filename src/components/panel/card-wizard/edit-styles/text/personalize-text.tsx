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
import { DefaultTextElement, useCardStylesStore } from "~/stores/card";

import { Autosubmit, Form, Input, InputColor } from "~/components/form";

import { ActionIcon } from "~/components/special/action-icon";
import {
  ToggleGroupControlled,
  type ToggleGroupControlledProps,
} from "~/components/form/toggle-group-controlled";

import { ToggleTextForm } from "./toggle-text-form";
import { api } from "~/providers/trpc-provider";

import { Button } from "~/components/common";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export const PersonalizeText = () => {
  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: DefaultTextElement,
    resolver: zodResolver(TextElementConfigSchema),
  });

  const utils = api.useUtils();

  const { getChoosenElement, changeTextElement } = useCardStylesStore();
  const choosenElement = getChoosenElement();

  const { mutate, isLoading } = api.card.updateTextElement.useMutation({
    onMutate: async data => {
      console.log({ data });
      await utils.card.getBusinessCard.invalidate();
    },
  });

  useEffect(() => {
    methods.reset({ ...DefaultTextElement, ...choosenElement });
  }, [choosenElement?.id]);

  function onSubmit(data: z.infer<typeof TextElementConfigSchema>) {
    if (choosenElement) {
      changeTextElement({ id: choosenElement?.id, code: choosenElement.code, ...data });
    }
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
          {/* <Input name="fontSize" label="Rozmiar tekstu" type="number" defaultValue={16} />
          <InputColor name="fontColor" label="Kolor tekstu" />
          <CheckboxGroup name="textDecoration" label="Nagłówek" items={textDecorations} /> */}
          {textElementConfigInputs
            ? textElementConfigInputs.map(input => returnCorrectInputType(input.inputType, input))
            : null}

          <Autosubmit />
          <Button
            onClick={() => {
              // mutate()
              console.log("save all card styles");
            }}
            type="button"
            isLoading={isLoading}
          >
            Zapisz zmiany
          </Button>
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

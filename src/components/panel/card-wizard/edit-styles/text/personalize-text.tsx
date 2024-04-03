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

import {
  Autosubmit,
  Form,
  Input,
  InputColor,
  SelectControlled,
  SelectControlledProps,
} from "~/components/form";
import {
  ToggleGroupControlled,
  type ToggleGroupControlledProps,
} from "~/components/form/toggle-group-controlled";
import { api } from "~/providers/trpc-provider";

import { Button, Text } from "~/components/common";

import { ToggleTextForm } from "~/components/panel/card-wizard/edit-styles/text/toggle-text-form";

export const PersonalizeText = () => {
  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: DefaultTextElement,
    resolver: zodResolver(TextElementConfigSchema),
  });
  const { mutate, isLoading } = api.card.updateTextElement.useMutation({
    onMutate: async data => {
      await utils.card.getBusinessCard.invalidate();
    },
  });

  const utils = api.useUtils();

  const { getChoosenElement, changeTextElement } = useCardStylesStore();
  const choosenElement = getChoosenElement();

  useEffect(() => {
    if (choosenElement) methods.reset({ ...DefaultTextElement, ...choosenElement });
  }, [choosenElement?.id]);

  function onSubmit(data: z.infer<typeof TextElementConfigSchema>) {
    if (choosenElement) {
      changeTextElement({ id: choosenElement?.id, code: choosenElement.code, ...data });
    }
  }

  return (
    <div className="mt-8 flex max-h-[80vh] flex-col gap-4 overflow-y-auto">
      {!choosenElement ? (
        <Text color="neutral-500">Wybierz element, aby go skonfigurować.</Text>
      ) : (
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {textElementConfigInputs
              ? textElementConfigInputs.map(({ inputType, ...props }) =>
                  returnCorrectInputType(inputType, props),
                )
              : null}

            <Autosubmit />
            <Button
              onClick={() => {
                console.log("DWATE", choosenElement, getChoosenElement(), methods.getValues());
                mutate({ ...DefaultTextElement, ...choosenElement, ...methods.getValues() });
                console.log("save all card styles", { DefaultTextElement, choosenElement });
              }}
              type="button"
              isLoading={isLoading}
            >
              Zapisz zmiany
            </Button>
          </form>
        </Form>
      )}
      <ToggleTextForm />
    </div>
  );
};

const returnCorrectInputType = (
  inputType: ControlledInputElements["inputType"],
  props: Omit<ControlledInputElements, "inputType">,
) => {
  switch (inputType) {
    case "color":
      return <InputColor key={`${props.label}-${props.name}`} {...props} />;
    case "input":
      return <Input key={`${props.label}-${props.name}`} {...props} />;
    case "toggle-group":
      return (
        <ToggleGroupControlled
          key={`${props.label}-${props.name}`}
          {...(props as ToggleGroupControlledProps)}
        />
      );
    case "select":
      return (
        <SelectControlled
          key={`${props.label}-${props.name}`}
          {...(props as SelectControlledProps)}
        />
      );
    default:
      return <Input key={`${props.label}-${props.name}`} {...props} />;
  }
};

"use client";

import React, { useCallback, useEffect } from "react";
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
  type SelectControlledProps,
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

  const { getChosenElement, getIsDirty, setStateClear, changeTextElement } = useCardStylesStore();

  const { mutate, isLoading } = api.card.updateTextElement.useMutation({
    onMutate: async data => {
      await utils.card.getBusinessCard.invalidate();
    },
    onSuccess: () => {
      setStateClear();
    },
  });

  const utils = api.useUtils();

  const chosenElement = getChosenElement();
  const isDirty = getIsDirty();
  console.log({ isDirty });

  useEffect(() => {
    if (chosenElement) methods.reset({ ...DefaultTextElement, ...chosenElement });
  }, [chosenElement?.id]);

  const onSubmit = useCallback(
    (data: z.infer<typeof TextElementConfigSchema>) => {
      console.log({ data });
      if (chosenElement) {
        const { id, code } = chosenElement;
        changeTextElement({ id, code, ...data });
      }
    },
    [chosenElement, changeTextElement],
  );

  const handleSaveSubmit = () => {
    mutate({ ...DefaultTextElement, ...chosenElement, ...methods.getValues() });
  };

  return (
    <div className="mt-8 flex max-h-[80vh] flex-col gap-4 overflow-y-auto">
      {!chosenElement ? (
        <Text color="neutral-500">Wybierz element, aby go skonfigurować.</Text>
      ) : (
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {textElementConfigInputs
              ? textElementConfigInputs.map(({ inputType, ...props }) =>
                  getInputType(inputType, props),
                )
              : null}

            <Autosubmit />
            <Button onClick={handleSaveSubmit} type="button" isLoading={isLoading}>
              Zapisz zmiany
            </Button>
            <Button
              type="button"
              onClick={() => {
                setStateClear();
                console.log("reset");
              }}
              variant={"outline"}
              disabled={!isDirty}
            >
              Resetuj zmiany
            </Button>
          </form>
        </Form>
      )}
      <ToggleTextForm />
    </div>
  );
};

const getInputType = (
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

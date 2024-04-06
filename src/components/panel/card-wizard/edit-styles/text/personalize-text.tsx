"use client";

import React, { useCallback, useEffect } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { type ControlledInputElements, textElementConfigInputs, TextElementConfigSchema } from "../helpers";
import { DefaultTextElement, useCardStylesStore } from "~/stores/card";
import { api } from "~/providers/trpc-provider";
import { type UpdateTextElementPayload } from "~/server/api/routers/card";

import { Autosubmit, Form, Input, InputColor, SelectControlled, type SelectControlledProps } from "~/components/form";
import { ToggleGroupControlled, type ToggleGroupControlledProps } from "~/components/form/toggle-group-controlled";

import { Button, Text } from "~/components/common";

import { ToggleTextForm } from "~/components/panel/card-wizard/edit-styles/text/toggle-text-form";
import { parseObjectNullsToUndefined } from "~/utils";

/**
 * @description It handles updating local styles of element, submitting it to Database and In Real Time preview of these changes. Its handling chosen text element styles like font size, tex color etc.
 * @param It doesn't get params, it gets actually chosen element from Zustand store
 * @
 */
export const PersonalizeText = () => {
  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: DefaultTextElement,
    resolver: zodResolver(TextElementConfigSchema),
  });
  const router = useRouter();
  const { getChosenElement, getIsDirty, setStateClear, changeTextElement } = useCardStylesStore();

  const { mutate, isLoading } = api.card.updateTextElement.useMutation({
    onSuccess: async () => {
      setStateClear();
      // TODO: Trpc revalidating kind of doesnt work in server query, so its workaround to refetch data. To fix in the future
      router.refresh();
    },
  });

  const chosenElement = getChosenElement();
  const isDirty = getIsDirty();

  useEffect(() => {
    if (chosenElement) methods.reset({ ...DefaultTextElement, ...chosenElement });
  }, [chosenElement?.id]);

  const onSubmit = useCallback(
    (data: z.infer<typeof TextElementConfigSchema>) => {
      if (chosenElement) {
        const { id, code } = chosenElement;
        changeTextElement({ id, code, ...data });
      }
    },
    [chosenElement, changeTextElement],
  );

  const handleSaveSubmit = () => {
    const newObj = parseObjectNullsToUndefined({
      ...DefaultTextElement,
      ...chosenElement,
      ...methods.getValues(),
    }) as UpdateTextElementPayload;

    mutate(newObj);
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

"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "~/providers/trpc-provider";
import { DefaultTextElement, useCardStylesStore } from "~/stores/card";
import { cn, parseObjectNullsToUndefined } from "~/utils";

import type { UpdateTextElementPayload } from "~/server/api/routers/card";

import { Button, useToast } from "~/components/common";
import {
  Autosubmit,
  Form,
  Input,
  InputColor,
  SelectControlled,
  type SelectControlledProps,
  ToggleGroupControlled,
  type ToggleGroupControlledProps,
} from "~/components/form";
import {
  type ControlledInputElements,
  textElementConfigInputs,
  TextElementConfigSchema,
} from "~/components/panel/card-wizard/edit-styles/helpers";

interface PersonalizeTextProps {
  className?: string;
}

/**
 * @description Component that is handling single text item customization.
 * Font sizes, text color etc. It is updating element locally, but have possibility to save it to DB
 * after submitting form by button
 * @param {string} className - Name of class for top wrapper component
 */
export const PersonalizeText = ({ className }: PersonalizeTextProps) => {

  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: DefaultTextElement,
    shouldUnregister: true,
    resolver: zodResolver(TextElementConfigSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const { changeTextElement, getChosenElement, getIsDirty, setStateClear } = useCardStylesStore();
  const { mutate, isLoading } = api.card.updateTextElement.useMutation({
    onSuccess: async () => {
      setStateClear();
      toast({
        title: "Sukces",
        description: "Pomyślnie zaktualizowano element.",
      });
      // TODO: Trpc revalidating kind of doesnt work in server query, so its workaround to refetch data. To fix in the future
      router.refresh();
    },
  });

  const [isMounted, setIsMounted] = useState(false);

  const chosenElement = getChosenElement();
  const isDirty = getIsDirty();

  useEffect(() => {
    if (chosenElement) {
      methods.reset({ ...DefaultTextElement, ...chosenElement });
    }
  }, [chosenElement?.id]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      methods.reset();
    };
  }, []);

  const onSubmit = useCallback(
    (data: z.infer<typeof TextElementConfigSchema>) => {

      console.log('DATA: ', data);

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

  const memoizedInputs = useMemo(
    () =>
      textElementConfigInputs.map(({ inputType, ...props }) =>
        getInputBasedOnType(inputType, props),
      ),
    [],
  );

  // const { selectedItems } = useSelection();

  // NEW APPROACH ----------------
  // const onColorChange = (e: MouseEvent<HTMLElement>) => {
  //   console.log("XDD SelectedItems:::", selectedItems, e);
  // };

  return (
    <div className={cn("flex flex-col gap-4 max-lg:max-h-[50vh]", className)}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {memoizedInputs && isMounted ? memoizedInputs : null}

          <Autosubmit />
          <Button
            variant={"primary"}
            onClick={handleSaveSubmit}
            type="button"
            isLoading={isLoading}
          >
            Zapisz zmiany
          </Button>
          <Button type="button" onClick={setStateClear} variant={"outline"} disabled={!isDirty}>
            Resetuj zmiany
          </Button>
        </form>
      </Form>
    </div>
  );
};

const getInputBasedOnType = (
  inputType: ControlledInputElements["inputType"],
  props: Omit<ControlledInputElements, "inputType">,
) => {
  switch (inputType) {
    case "color":
      return <InputColor key={`${props.label}-${props.name}`} {...props} />;
    case "input":
      return <Input key={`${props.label}-${props.name}`} size={"small"} {...props} />;
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

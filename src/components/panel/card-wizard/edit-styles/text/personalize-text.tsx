"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DefaultTextElement, useCardStylesStore } from "~/stores/card";
import { cn, parseObjectNullsToUndefined } from "~/utils";

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
import { Button } from "~/components/common";
import type { UpdateTextElementPayload } from "~/server/api/routers/card";
import { api } from "~/providers/trpc-provider";

interface PersonalizeTextProps {
  isScrollable?: boolean;
  className?: string;
}

/**
 * @description Component that is handling single text item customization.
 * Font sizes, text color etc. It is updating element locally, but have possibility to save it to DB
 * after submitting form by button
 * @param {boolean} isScrollable - If its true then object have overflow-y-auto to being scrollable (especially on desktop sidebar)
 * @param {string} className - Name of class for top wrapper component
 */
export const PersonalizeText = ({ isScrollable = false, className }: PersonalizeTextProps) => {
  const methods = useForm<z.infer<typeof TextElementConfigSchema>>({
    defaultValues: DefaultTextElement,
    resolver: zodResolver(TextElementConfigSchema),
  });
  const router = useRouter();

  const { changeTextElement, getChosenElement, getIsDirty, setStateClear } = useCardStylesStore();
  const { mutate, isLoading } = api.card.updateTextElement.useMutation({
    onSuccess: async () => {
      setStateClear();
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
      ...methods.getValues(),
      ...chosenElement,
    }) as UpdateTextElementPayload;

    mutate(newObj);
  };

  return (
    <div
      className={cn("flex max-h-[80vh] flex-col gap-4", className, {
        "overflow-y-auto": isScrollable,
      })}
    >
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {textElementConfigInputs && isMounted
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
            }}
            variant={"outline"}
            disabled={!isDirty}
          >
            Resetuj zmiany
          </Button>
        </form>
      </Form>
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

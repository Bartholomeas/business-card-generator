"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useCardStylesStore } from "~/stores/card";

import { Autosubmit, CheckboxInput, Form } from "~/components/form";

import {
  convertTextElementsToBooleans,
  TextElementHiddenSchema,
  type TextElementsHidden,
} from "../helpers";
import { api } from "~/providers/trpc-provider";
import { type TextElementCodes } from "~/server/api/routers/user";

/**
 * @description Toggling visibility of chosen text element. Toggling isHidden parameter
 */
export const ToggleTextForm = () => {
  const { getTextElementByCode, defaultTextElements, toggleTextElementHide } = useCardStylesStore();

  const form = useForm<z.infer<typeof TextElementHiddenSchema>>({
    defaultValues: convertTextElementsToBooleans(defaultTextElements),
    resolver: zodResolver(TextElementHiddenSchema),
  });

  const router = useRouter();

  const { mutate: toggleElement } = api.card.toggleTextElementHide.useMutation({
    onSuccess: async () => {
      router.refresh();
    },
  });

  function onSubmit(data: TextElementsHidden) {
    toggleTextElementHide(data);
  }

  const handleElementByCode = (code: TextElementCodes) => {
    const { id, isHidden } = getTextElementByCode(code);
    toggleElement({
      id,
      isHidden: !isHidden,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 gap-4 border-t border-border py-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
      >
        {defaultTextElements
          ? Object.values(defaultTextElements).map(item => {
              if (!item?.code) return null;
              return (
                <CheckboxInput
                  key={item.id}
                  name={item.code}
                  onCheckedChange={() => {
                    handleElementByCode(item.code);
                  }}
                  label={
                    <div className="flex h-full flex-col justify-center">
                      <p className="text-textPrimary">{item.text}</p>
                      <p className="text-sm text-textSecondary opacity-50">{item.code}</p>
                    </div>
                  }
                />
              );
            })
          : null}
        <Autosubmit time={100} />
      </form>
    </Form>
  );
};

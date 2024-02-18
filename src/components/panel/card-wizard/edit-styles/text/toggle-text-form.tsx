"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCardStylesStore } from "~/stores/card";

import { CheckboxInput, Form } from "~/components/common/form";
import { Autosubmit } from "~/components/common/special";
import {
  type TextElementsHidden,
  TextElementHiddenSchema,
  convertTextElementsToBooleans,
} from "../helpers";

export const ToggleTextForm = () => {
  const { defaultTextElements, toggleTextElementHide } = useCardStylesStore();

  const form = useForm<z.infer<typeof TextElementHiddenSchema>>({
    resolver: zodResolver(TextElementHiddenSchema),
    defaultValues: convertTextElementsToBooleans(defaultTextElements),
  });

  function onSubmit(data: TextElementsHidden) {
    console.log(convertTextElementsToBooleans(defaultTextElements));
    toggleTextElementHide(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {defaultTextElements
          ? Object.values(defaultTextElements).map(item => {
              if (!item?.code) return null;
              return (
                <CheckboxInput
                  key={item.id}
                  name={item.code}
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

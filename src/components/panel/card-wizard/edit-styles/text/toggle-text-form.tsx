"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckboxInput, Form } from "~/components/common/form";

import { type TextElementCodes } from "~/server/api/routers/user";

import { Autosubmit } from "~/components/common/special";
import { useCardStylesStore } from "~/stores/card";
import { type MappedDefaultTextElements } from "~/misc/utils/misc";

const TextElementsSchema = z.record(z.boolean().default(false));

const convertTextElementsToBooleans = (
  data: MappedDefaultTextElements | undefined = {},
): Record<TextElementCodes, boolean> =>
  Object.fromEntries(
    Object.values(data)
      .filter(item => item?.code)
      .map(item => [item.code, Boolean(item.isHidden)]),
  ) as Record<TextElementCodes, boolean>;

export const ToggleTextForm = () => {
  const { defaultTextElements } = useCardStylesStore();

  const form = useForm<z.infer<typeof TextElementsSchema>>({
    resolver: zodResolver(TextElementsSchema),
    defaultValues: convertTextElementsToBooleans(defaultTextElements),
  });

  function onSubmit(data: z.infer<typeof TextElementsSchema>) {
    console.log("subbmit xdd", data);
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
        <Autosubmit />
      </form>
    </Form>
  );
};

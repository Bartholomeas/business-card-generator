import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CheckboxGroup, Form, Input, InputColor } from "~/components/common/form";
import { useToast } from "~/components/common/ui";
import { ActionIcon } from "~/components/common/special";

import { useCardStylesContext } from "../card-styles-handler/hooks";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

const FormSchema = z.object({
  textDecoration: z.array(z.string()),
  fontSize: z.number(),
  fontColor: z.string(),
});

export const PersonalizeText = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const { dispatch } = useCardStylesContext();

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            {textAligns.map(item => (
              <ActionIcon
                key={`textAlignActionIcon-${item.label}`}
                label={item.label}
                onClick={() => {
                  console.log(form.getValues());
                  item.onClick();
                }}
                variant="outline"
              >
                {item.icon}
              </ActionIcon>
            ))}
          </div>
          <Input name="fontSize" label="Rozmiar tekstu" type="number" defaultValue={16} />
          <InputColor name="fontColor" label="Kolor tekstu" />
          <CheckboxGroup name="textDecoration" label="Nagłówek" items={textDecorations} />
        </form>
      </Form>
    </div>
  );
};

const textDecorations = [
  {
    label: "Bold",
    value: "bold",
  },
  {
    label: "Italic",
    value: "italic",
  },
  {
    label: "Underline",
    value: "underline",
  },
] as const;

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

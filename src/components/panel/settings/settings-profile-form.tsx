"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { userSettingsSchema } from "~/server/api/routers/user/userSchemas";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";

import { InputWithLabel } from "~/components/common/inputs/input-with-label";
import { TextareaWithLabel } from "~/components/common/inputs/textarea-with-label";

export const SettingsProfileForm = () => {
  const form = useForm({
    resolver: zodResolver(userSettingsSchema),
  });

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-4">
        <InputWithLabel
          label="Nazwa użytkownika"
          name="name"
          placeholder="JDoe"
        />
        <div className="flex flex-row flex-nowrap gap-4">
          <InputWithLabel label="Imie" name="firstName" placeholder="John" />
          <InputWithLabel label="Nazwisko" name="lastName" placeholder="Doe" />
        </div>
        <TextareaWithLabel
          label="Opis"
          name="name"
          placeholder="Opowiedz nam coś o sobie"
        />

        <Button type="submit" className="self-end">
          Zapisz zmiany
        </Button>
      </form>
    </Form>
  );
};

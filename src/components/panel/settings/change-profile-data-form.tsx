"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "~/providers/trpc-provider";
import { userProfileSchema } from "~/server/api/routers/user/user.schemas";

import { Form, Input, InputTextarea } from "~/components/form";
import { Button, Heading, useToast } from "~/components/common";

import { type UserProfile } from "~/server/api/routers/user/user.types";

interface ChangeProfileDataFormProps {
  user: UserProfile | undefined;
}

type UserProfileCore = z.infer<typeof userProfileSchema>;

export const ChangeProfileDataForm = ({ user }: ChangeProfileDataFormProps) => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: user,
  });

  const { mutate, isLoading } = api.user.updateUserProfile.useMutation({
    onSuccess: async () => {
      toast({
        title: "Sukces",
        description: "Twój profil został zaktualizowany pomyślnie.",
      });
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Nie mogliśmy zaktualizować Twojego profilu.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: UserProfileCore) => {
    mutate(values);
    form.reset(values);
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <Heading type={"h3"} size={"h4"}>
        Dane profilu
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
          <Input label="Nazwa użytkownika" name="name" placeholder="JDoe" />
          <div className="flex flex-row flex-nowrap gap-4">
            <Input label="Imie" name="firstName" placeholder="John" />
            <Input label="Nazwisko" name="lastName" placeholder="Doe" />
          </div>
          <InputTextarea label="Opis" name="description" placeholder="Opowiedz nam coś o sobie" />

          <Button type="submit" className="self-end" isLoading={isLoading}>
            Zapisz zmiany
          </Button>
        </form>
      </Form>
    </div>
  );
};

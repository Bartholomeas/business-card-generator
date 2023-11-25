"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "~/trpc/react";
import { userProfileSchema } from "~/server/api/routers/user/userSchemas";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { InputWithLabel } from "~/components/common/inputs/input-with-label";
import { TextareaWithLabel } from "~/components/common/inputs/textarea-with-label";
import { useToast } from "~/components/ui/use-toast";

import { type UserProfile } from "~/server/api/routers/user/types";

interface Props {
  user: UserProfile;
}

type UserProfileCore = z.infer<typeof userProfileSchema>;

export const ChangeProfileDataForm = ({ user }: Props) => {
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
    <div className="flex flex-col gap-8">
      <h3 className="text-3xl font-bold tracking-tight">Profil</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <InputWithLabel
            label="Nazwa użytkownika"
            name="name"
            placeholder="JDoe"
          />
          <div className="flex flex-row flex-nowrap gap-4">
            <InputWithLabel label="Imie" name="firstName" placeholder="John" />
            <InputWithLabel
              label="Nazwisko"
              name="lastName"
              placeholder="Doe"
            />
          </div>
          <TextareaWithLabel
            label="Opis"
            name="description"
            placeholder="Opowiedz nam coś o sobie"
          />

          <Button type="submit" className="self-end" isLoading={isLoading}>
            Zapisz zmiany
          </Button>
        </form>
      </Form>
    </div>
  );
};

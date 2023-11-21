"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import { userSettingsSchema } from "~/server/api/routers/user/userSchemas";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { InputWithLabel } from "~/components/common/inputs/input-with-label";
import { TextareaWithLabel } from "~/components/common/inputs/textarea-with-label";

import { type UserProfile } from "~/server/api/routers/user/types";
import { useToast } from "~/components/ui/use-toast";

interface Props {
  user: UserProfile;
}

export const SettingsProfileForm = ({ user }: Props) => {
  const form = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: user,
  });

  const { toast } = useToast();

  console.log(form.getValues());

  const utils = api.useUtils();
  const xd = utils.user.getMe.refetch();
  const { mutate, isLoading } = api.user.updateUserProfile.useMutation({
    onSuccess: () => {
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

  const onSubmit = async () => {
    // setIsLoading(true);
    // return await signIn("credentials", {
    //   email: form.getValues("email"),
    //   password: form.getValues("password"),
    //   redirect: false,
    // })
    //   .then(() => {
    //     toast({
    //       title: "Zalogowano",
    //       description: "Logowanie przebiegło pomyślnie.",
    //     });
    //     router.push(routes.home);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
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
          <InputWithLabel label="Nazwisko" name="lastName" placeholder="Doe" />
        </div>
        <TextareaWithLabel
          label="Opis"
          name="description"
          placeholder="Opowiedz nam coś o sobie"
        />

        <Button type="submit" className="self-end">
          Zapisz zmiany
        </Button>
      </form>
    </Form>
  );
};

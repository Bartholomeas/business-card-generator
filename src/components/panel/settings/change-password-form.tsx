"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type z } from "zod";
import { api } from "~/trpc/react";

import { changePasswordSchema } from "~/server/api/routers/user/user-schemas";

import { Input } from "~/components/common/form/input";
import { Form } from "~/components/common/form/form";
import { Button } from "~/components/common/ui/button";
import { useToast } from "~/components/common/ui/toast/use-toast";

type UserPasswordChange = z.infer<typeof changePasswordSchema>;

export const ChangePasswordForm = () => {
  const { toast } = useToast();

  const form = useForm<UserPasswordChange>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isLoading } = api.user.updatePassword.useMutation({
    onSuccess: () => {
      toast({
        title: "Pomyślnie zmieniono hasło",
        description: "Teraz już możesz używać swojego nowego hasła.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Nie mogliśmy zmienić hasła.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: UserPasswordChange) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
        <Input
          label="Stare hasło"
          name="password"
          type="password"
          placeholder="Twoje obecne hasło"
        />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            label="Nowe hasło"
            name="newPassword"
            type="password"
            placeholder="********"
            description="Hasło musi posiadać conajmniej jedną liczbę, wielką literę oraz znak specjalny."
          />
          <Input
            label="Powtórz hasło"
            name="newPasswordConfirm"
            type="password"
            placeholder="********"
          />
        </div>
        <Button type="submit" className="self-end" isLoading={isLoading}>
          Zmień hasło
        </Button>
      </form>
    </Form>
  );
};

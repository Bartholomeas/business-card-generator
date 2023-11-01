"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { routes } from "~/misc/routes";
import { api } from "~/trpc/react";
import { loginSchema } from "~/server/api/routers/schemas/user";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InputWithLabel } from "~/components/common/ui/input-with-label";
import { SeparatorWithText } from "~/components/common/special/separator-with-text";
import { Form } from "~/components/ui/form";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
  };
  // const test = await api.user.login.mutate({
  //   firstName: "firstNamedsd",
  //   lastName: "lastNamexdcxd",
  //   email: "emaildccdcd",
  //   password: "passworddasd",
  //   passwordConfirm: "passwordConfirm123",
  // });
  // console.log(test);

  const login = api.user.login.useMutation({
    onSuccess: () => {
      console.log("SUKCES!");
    },
  });

  return (
    <div className="top-0 mx-auto w-full max-w-[500px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Zaloguj się</CardTitle>
        <CardDescription>Wprowadź dane i zaloguj się.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button
            onClick={() => {
              login.mutate(form.getValues());
            }}
            variant="outline"
          >
            Github
          </Button>
          <Button variant="outline">Google</Button>
        </div>
        <SeparatorWithText>Lub</SeparatorWithText>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            // method="post"
            // action="/api/auth/login/email"
          >
            <InputWithLabel
              name="email"
              label="E-mail"
              placeholder="jdoe@test.com"
            />
            <div className="flex flex-col gap-2">
              <InputWithLabel
                name="password"
                label="Hasło"
                placeholder="********"
                type="password"
              />

              <Link
                href={routes.signUp}
                className="self-end text-sm font-semibold text-textPrimary"
              >
                Przypomnij hasło
              </Link>
            </div>

            <Button type="submit" className="mt-4 w-full">
              Zaloguj się
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex w-full flex-col gap-4">
        <p className="text-sm text-textSecondary">
          Nie masz konta?{" "}
          <Link href={routes.signUp} className="font-semibold text-textPrimary">
            Zarejestruj się
          </Link>
        </p>
      </CardFooter>
    </div>
  );
};

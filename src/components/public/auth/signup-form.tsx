"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { routes } from "~/misc/routes";
import { signUpSchema } from "~/server/api/routers/schemas/user";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { InputWithLabel } from "~/components/common/ui/input-with-label";
import { SeparatorWithText } from "~/components/common/special/separator-with-text";

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = () => {
    console.log("xd");
  };

  return (
    <div className="top-0 mx-auto w-full max-w-[500px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Stwórz konto</CardTitle>
        <CardDescription>Wprowadź dane i zarejestruj się.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">Github</Button>
          <Button variant="outline">Google</Button>
        </div>
        <SeparatorWithText>Lub</SeparatorWithText>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            // method="post"
            // action="/api/auth/login/email"
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <InputWithLabel
                label="Imie"
                name="firstName"
                type="text"
                placeholder="John"
                className="w-full"
              />
              <InputWithLabel
                label="Nazwisko"
                name="lastName"
                type="text"
                placeholder="Doe"
                className="w-full"
              />
            </div>
            <InputWithLabel
              label="E-mail"
              name="email"
              type="email"
              placeholder="kwirk@contact.pl"
              className="w-full"
            />

            <InputWithLabel
              label="Hasło"
              name="password"
              type="password"
              placeholder="********"
            />

            <InputWithLabel
              label="Potwierdź hasło"
              name="passwordConfirm"
              type="password"
              placeholder="********"
            />
            <Button type="submit" className="mt-4 w-full">
              Zarejestruj się
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex w-full flex-col gap-4">
        <p className="text-sm text-textSecondary">
          Masz już konto?{" "}
          <Link href={routes.login} className="font-semibold text-textPrimary">
            Zaloguj się
          </Link>
        </p>
      </CardFooter>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { routes } from "~/misc/routes";
import { loginSchema } from "~/server/api/routers/user/userSchemas";

import { useToast } from "~/components/ui/use-toast";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { InputWithLabel } from "~/components/common/inputs/input-with-label";
import { Form } from "~/components/ui/form";

type LoginInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    return await signIn("credentials", {
      email: form.getValues("email"),
      password: form.getValues("password"),
      redirect: false,
    })
      .then(() => {
        toast({
          title: "Zalogowano",
          description: "Logowanie przebiegło pomyślnie.",
        });
        router.push(routes.home);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="top-0 mx-auto w-full max-w-[500px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Zaloguj się</CardTitle>

        <CardDescription> Wprowadź dane i zaloguj się.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">Github</Button>
          <Button variant="outline" onClick={signInWithGoogle}>
            Google
          </Button>
        </div>
        <SeparatorWithText>Lub</SeparatorWithText> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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

            <Button isLoading={isLoading} type="submit" className="mt-4 w-full">
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

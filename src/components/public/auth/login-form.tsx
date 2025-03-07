"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { signIn, type SignInResponse } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { routes } from "~/routes/routes";

import { loginSchema } from "~/server/api/routers/user/user.schemas";

import { Button } from "~/components/common/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/common/card";
import { useToast } from "~/components/common/toast/use-toast";
import { Form } from "~/components/form/form";
import { Input } from "~/components/form/input";
import { AlertInfo } from "~/components/special/alert-info";

type LoginInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    setError(false);
    setIsLoading(true);
    return signIn("credentials", {
      email: form.getValues("email"),
      password: form.getValues("password"),
      redirect: false,
    })
      .then((value: SignInResponse | undefined) => {
        if (value?.ok) {
          toast({
            title: "Zalogowano",
            description: "Logowanie przebiegło pomyślnie.",
          });
          router.push(routes.home);
        }
        if (value?.error) {
          setError(true);
          toast({
            title: "Wystąpił błąd",
            description: "Dane są niepoprawne. Spróbuj ponownie",
            variant: "destructive",
          });
        }
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input name="email" label="E-mail" placeholder="jdoe@test.com" />
            <div className="flex flex-col gap-2">
              <Input name="password" label="Hasło" placeholder="********" type="password" />

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
            {form.formState.isDirty && isError ? (
              <AlertInfo icon={XCircle} variant="destructive">
                Niepoprawne dane, spróbuj ponownie.
              </AlertInfo>
            ) : null}
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

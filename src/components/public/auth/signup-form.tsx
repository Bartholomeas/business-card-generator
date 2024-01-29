"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";

import { api } from "~/trpc/react";
import { routes } from "~/misc/routes";
import { signUpSchema } from "~/server/api/routers/user/user-schemas";

import { useToast } from "~/components/common/ui/toast/use-toast";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/common/ui/card";

import { Form } from "~/components/common/form/form";
import { Button } from "~/components/common/ui/button";
import { Input } from "~/components/common/form/input";
import { CheckboxInput } from "~/components/common/form/checkbox";

type SignupInputs = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignupInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isLoading } = api.user.signUp.useMutation({
    onSuccess: () => {
      toast({
        title: "Sukces!",
        description: "Stworzenie konta przebiegło pomyślnie. Możesz się zalogować",
      });

      router.replace(routes.login);
    },
  });

  const onSubmit = (values: SignupInputs) => {
    mutate(values);
  };

  return (
    <div className="top-0 mx-auto w-full max-w-[500px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Stwórz konto</CardTitle>
        <CardDescription>Wprowadź dane i zarejestruj się.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">Github</Button>
          <Button variant="outline">Google</Button>
        </div>
        <SeparatorWithText>Lub</SeparatorWithText> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Nazwa"
              name="name"
              type="text"
              placeholder="John Doe"
              className="w-full"
            />

            <Input
              label="E-mail"
              name="email"
              type="email"
              placeholder="kwirk@contact.pl"
              className="w-full"
            />

            <Input label="Hasło" name="password" type="password" placeholder="********" />

            <Input
              label="Potwierdź hasło"
              name="passwordConfirm"
              type="password"
              placeholder="********"
            />
            <CheckboxInput
              name="policyAgree"
              label="Przeczytałem i wyrażam zgodę na politykę tego serwisu."
            />
            <Button isLoading={isLoading} type="submit" className="mt-4 w-full">
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

"use client";

import Link from "next/link";

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

import { routes } from "~/misc/routes";
import { api } from "~/trpc/react";
// import { api } from "~/trpc/server";

export const SignInForm = () => {
  // const test = await api.user.signIn.mutate({
  //   firstName: "firstNamedsd",
  //   lastName: "lastNamexdcxd",
  //   email: "emaildccdcd",
  //   password: "passworddasd",
  //   passwordConfirm: "passwordConfirm123",
  // });
  // console.log(test);

  const signUp = api.user.signUp.useMutation({
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
              signUp.mutate({
                // firstName: "firstNameXD",
                // lastName: "lastNameXD",
                email: "emailXDhehe@onet.pl",
                // password: "!23Haslo",
                // passwordConfirm: "!23Haslo",
              });

              // signInUser.mutate({
              //   email: "emaildccdcd",
              //   firstName: "firstNamedsd",
              //   lastName: "lastNamexdcxd",
              //   password: "passworddasd",
              //   passwordConfirm: "passwordConfirm123",
              // });
            }}
            variant="outline"
          >
            Github
          </Button>
          <Button variant="outline">Google</Button>
        </div>
        <SeparatorWithText>Lub</SeparatorWithText>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          method="post"
          action="/api/auth/signin/email"
        >
          <InputWithLabel
            labelText="E-mail"
            name="email"
            type="email"
            placeholder="kwirk@contact.pl"
            className="w-full"
          />
          <div className="flex flex-col gap-2">
            <InputWithLabel
              labelText="Hasło"
              name="password"
              type="password"
              placeholder="********"
            />
            <Link
              href={routes.signUp}
              className="self-end text-sm font-semibold text-textPrimary"
            >
              Przypomnij hasło
            </Link>
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </CardContent>
      <CardFooter className="flex w-full flex-col gap-4">
        <Button className="w-full">Zaloguj się</Button>
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

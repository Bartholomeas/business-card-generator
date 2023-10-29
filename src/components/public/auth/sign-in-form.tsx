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

export const SignInForm = () => {
  return (
    <div className="top-0 mx-auto w-full max-w-[500px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Zaloguj się</CardTitle>
        <CardDescription>Wprowadź dane i zaloguj się.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">Github</Button>
          <Button variant="outline">Google</Button>
        </div>
        <SeparatorWithText>Lub</SeparatorWithText>

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

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

export const SignUpForm = () => {
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

        <div className="grid gap-2 sm:grid-cols-2">
          <InputWithLabel
            labelText="Imie"
            name="firstName"
            type="text"
            placeholder="John"
            className="w-full"
          />
          <InputWithLabel
            labelText="Nazwisko"
            name="lastName"
            type="text"
            placeholder="Doe"
            className="w-full"
          />
        </div>
        <InputWithLabel
          labelText="E-mail"
          name="email"
          type="email"
          placeholder="kwirk@contact.pl"
          className="w-full"
        />

        <InputWithLabel
          labelText="Hasło"
          name="password"
          type="password"
          placeholder="********"
        />

        <InputWithLabel
          labelText="Potwierdź hasło"
          name="confirm-password"
          type="password"
          placeholder="********"
        />
      </CardContent>
      <CardFooter className="flex w-full flex-col gap-4">
        <Button className="w-full">Zarejestruj się</Button>
        <p className="text-sm text-textSecondary">
          Masz już konto?{" "}
          <Link href={routes.signUp} className="font-semibold text-textPrimary">
            Zaloguj się
          </Link>
        </p>
      </CardFooter>
    </div>
  );
};

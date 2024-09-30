"use client";

import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { routes } from "~/routes/routes";
import { api } from "~/providers/trpc-provider";

import { cn } from "~/utils";
import { userCompanySchema } from "~/server/api/routers/company/company.schemas";

import { Form, Input, type InputControlledProps } from "~/components/form";
import { Button, buttonVariants, Heading, useToast } from "~/components/common";

import type { Company } from "~/server/api/routers/company";

import { ChevronRight } from "lucide-react";

export const ChangeCompanyDataForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = api.useUtils();

  const { data: company } = api.user.getUserCompany.useQuery();

  const form = useForm({
    defaultValues: company,
    resolver: zodResolver(userCompanySchema),
  });

  const { mutate, isLoading } = api.user.updateUserCompany.useMutation({
    onSuccess: async () => {
      toast({
        title: "Sukces",
        description: "Dane firmy zostały zaktualizowane.",
      });
      router.refresh();
      await utils.user.getUserCompany.invalidate();
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Nie mogliśmy zaktualizować danych firmy.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: Company) => {
    if (values.companyName) {
      form.reset(values);
      mutate(values);
    }
  };

  const memoizedInputs = useMemo(
    () =>
      inputsList.map(({ className, ...input }) => (
        <Input
          key={`${input.label}-${input.name}`}
          {...input}
          className={cn("sm:col-span-2", className)}
        />
      )),
    [],
  );

  const slug = company?.slug;

  return (
    <div className={"flex w-full flex-col gap-4"}>
      <div className={"flex w-full items-center justify-between gap-2"}>
        <Heading type={"h3"} size={"h4"}>
          Dane firmy
        </Heading>
        {slug ? (
          <Link
            href={routes.companyPage(slug)}
            className={buttonVariants({
              variant: "link",
              size: "sm",
              className: "w-fit bg-primary-400",
            })}
          >
            Przejdź do strony firmy
            <ChevronRight size={16} className={"ml-2"} />
          </Link>
        ) : null}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid w-full grid-cols-1 justify-end gap-4 sm:grid-cols-2">
            {memoizedInputs}
          </div>
          <Button variant={"primary"} type="submit" className="self-end" isLoading={isLoading}>
            Zapisz zmiany
          </Button>
        </form>
      </Form>
    </div>
  );
};

const inputsList: InputControlledProps[] = [
  {
    name: "companyName",
    label: "Nazwa firmy",
    placeholder: "Wpisz nazwę firmy",
    required: true,
  },
  {
    name: "ownerName",
    label: "Imię i nazwisko właściciela",
    placeholder: "Wpisz imię i nazwisko właściciela",
  },
  {
    name: "nip",
    label: "Numer NIP",
    placeholder: "Wpisz numer NIP",
  },
  {
    name: "regon",
    label: "REGON",
    placeholder: "Wpisz numer REGON",
  },
  {
    name: "phoneNumber",
    label: "Numer telefonu",
    placeholder: "Wpisz numer telefonu",
  },
  {
    name: "email",
    label: "E-mail",
    placeholder: "Wpisz adres e-mail",
  },
  {
    name: "website",
    label: "Strona internetowa",
    placeholder: "Wpisz adres strony internetowej",
  },
  {
    name: "addressLine1",
    label: "Adres",
    placeholder: "Wpisz adres",
    className: "sm:col-span-1",
  },
  {
    name: "addressLine2",
    label: "Numer domu",
    placeholder: "Wpisz numer domu",
    className: "sm:col-span-1",
  },
  {
    name: "postalCode",
    type: "number",
    label: "Kod pocztowy",
    placeholder: "Wpisz kod pocztowy",
    className: "sm:col-span-1",
  },
  {
    name: "city",
    label: "Miasto",
    placeholder: "Wpisz miasto",
    className: "sm:col-span-1",
  },

  // {
  //   name: "country",
  //   label: "Kraj",
  //   placeholder: "Wpisz kraj",
  //   defaultValue: "pl",
  // },
];

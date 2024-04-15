"use client";

import React from "react";
import { type Company } from "@prisma/client";

import { type InputControlledProps } from "~/components/form";
import { Heading, useToast } from "~/components/common";

// type UserCompany = z.infer<typeof userCompanySchema>;

interface ChangeCompanyDataFormProps {
  company: Company | undefined;
}

export const ChangeCompanyDataForm = ({ company }: ChangeCompanyDataFormProps) => {
  const { toast } = useToast();
  console.log({ company });
  // const form = useForm({
  //   defaultValues: company,
  //   resolver: zodResolver(userCompanySchema),
  // });

  // const { mutate, isLoading } = api.user.updateUserProfile.useMutation({
  //   onSuccess: async () => {
  //     toast({
  //       title: "Sukces",
  //       description: "Twój profil został zaktualizowany pomyślnie.",
  //     });
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Błąd",
  //       description: "Nie mogliśmy zaktualizować Twojego profilu.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // const onSubmit = (values: UserCompany) => {
  //   form.reset(values);
  // };

  return (
    <div className={"flex w-full flex-col gap-4"}>
      <Heading type={"h3"} size={"h4"}>
        Dane firmy
      </Heading>
      {/*<Form {...form}>*/}
      {/*  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">*/}
      {/*    <div className="grid w-full grid-cols-1 justify-end gap-4 sm:grid-cols-2">*/}
      {/*      {inputsList.map(({ className, ...input }) => (*/}
      {/*        <Input*/}
      {/*          key={`${input.label}-${input.name}`}*/}
      {/*          {...input}*/}
      {/*          className={cn("sm:col-span-2", className)}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*    <Button type="submit" className="self-end">*/}
      {/*      Zapisz zmiany*/}
      {/*    </Button>*/}
      {/*  </form>*/}
      {/*</Form>*/}
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
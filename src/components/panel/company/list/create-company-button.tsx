'use client';

import { useRouter } from "next/navigation";

import { api } from "~/providers/trpc-provider";

import { Button, useToast } from "~/components/common";

export const CreateCompanyButton = () => {
  const router = useRouter();
  const { toast } = useToast();

  const utils = api.useUtils();
  const { mutate: createCompanyPage, isLoading } = api.company.createCompanyPage.useMutation({
    onSuccess: async () => {
      toast({
        title: "Sukces",
        description: "Strona firmy została stworzona",
      });
      await utils.company.getCompanyPageSectionsVisibility.invalidate();
      await utils.company.getUserCompanies.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleCreateCompany = () => {
    createCompanyPage({});
  };

  return <Button
    className="w-fit"
    onClick={handleCreateCompany}
    disabled={isLoading}
    isLoading={isLoading}>
    Dodaj stronę firmową
  </Button>;
};  
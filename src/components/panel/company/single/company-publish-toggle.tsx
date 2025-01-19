"use client";

import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";

import { api } from "~/providers/trpc-provider";

import { Switch, useToast } from "~/components/common";

interface CompanyPublishToggleProps {
  companyId: string;
  isPublished: boolean;
}

export const CompanyPublishToggle = ({ companyId, isPublished }: CompanyPublishToggleProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate: togglePublish } = api.company.toggleCompanyPublish.useMutation({
    onSuccess: async () => {
      await utils.company.getCompanyPageSectionsVisibility.invalidate();
      await utils.company.getUserCompanies.invalidate();
      router.refresh();
      toast({
        title: "Sukces",
        description: `Firma została ${isPublished ? "ukryta" : "opublikowana"}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleTogglePublish = () => {
    if (!companyId) {
      console.error("No company ID provided");
      return;
    }

    togglePublish({
      companyId,
      isPublished: !isPublished,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {isPublished ? (
          <Eye className="size-4 text-muted-foreground" />
        ) : (
          <EyeOff className="size-4 text-muted-foreground" />
        )}
        <Switch
          checked={isPublished}
          onCheckedChange={handleTogglePublish}
        />
      </div>
      <span className="text-sm text-muted-foreground">
        {isPublished ? "Strona opublikowana" : "Strona ukryta"}
      </span>
    </div>
  );
}; 
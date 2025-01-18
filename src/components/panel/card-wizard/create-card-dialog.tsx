'use client';

import { useState } from "react";

import { useRouter } from "next/navigation";

import { api } from "~/providers/trpc-provider";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from "~/components/common";

type CreateCardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateCardDialog = ({ open, onOpenChange }: CreateCardDialogProps) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>();
  const { toast } = useToast();
  const router = useRouter();

  const { data: companies } = api.company.getUserCompanies.useQuery();
  const utils = api.useUtils();

  const { mutate: createCard, isLoading } = api.card.createCompanyBusinessCard.useMutation({
    onSuccess: async () => {
      toast({
        title: "Sukces",
        description: "Wizytówka została utworzona",
      });
      await utils.card.getUserBusinessCard.invalidate();
      router.refresh();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    if (!selectedCompanyId) {
      toast({
        title: "Błąd",
        description: "Wybierz firmę",
        variant: "destructive",
      });
      return;
    }

    createCard({ companyId: selectedCompanyId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Utwórz wizytówkę</DialogTitle>
          <DialogDescription>
            Wybierz firmę, dla której chcesz utworzyć wizytówkę
          </DialogDescription>
        </DialogHeader>

        <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz firmę" />
          </SelectTrigger>
          <SelectContent>
            {companies?.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.companyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Anuluj
          </Button>
          <Button onClick={handleCreate} disabled={isLoading} isLoading={isLoading}>
            Utwórz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 
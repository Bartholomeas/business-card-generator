'use client';

import { useRouter } from "next/navigation";

import { api } from "~/providers/trpc-provider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/common";

interface CardSwitcherProps {
  currentCardId?: string;
}

export const CardSwitcher = ({ currentCardId }: CardSwitcherProps) => {
  const router = useRouter();
  const { data: cards } = api.card.getAllCards.useQuery();
  const utils = api.useUtils();

  const handleCardChange = async (cardId: string) => {
    await utils.card.getUserBusinessCard.invalidate();
    router.refresh();
  };

  if (!cards?.length) return null;

  return (
    <Select value={currentCardId} onValueChange={handleCardChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Wybierz wizytówkę" />
      </SelectTrigger>
      <SelectContent>
        {cards.map((card) => (
          <SelectItem key={card.id} value={card.id}>
            {card.company?.companyName ?? 'Wizytówka bez firmy'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}; 
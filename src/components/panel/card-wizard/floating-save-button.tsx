"use client";

import { useState } from "react";

import { Save } from "lucide-react";

import { useCardStylesStore } from "~/stores/card";

import { Button } from "~/components/common";
import { useToast } from "~/components/common/toast/use-toast";

export const FloatingSaveButton = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { isDirty, decorationElements, setStateClear } = useCardStylesStore();
  const { toast } = useToast();

  console.log("DECORS:: ", decorationElements);
  // const { mutateAsync: updateCard } = api.card.update.useMutation();
  // const { mutateAsync: updateDecorations } = api.card.updateDecorations.useMutation();

  const handleSave = async () => {
    if (!isDirty) return;

    try {
      setIsSaving(true);

      // Save general card data
      // await updateCard({
      //   front,
      //   back,
      //   generalStyles,
      //   defaultTextElements,
      // });

      // Save decorations for front and back
      // if (front?.decorationElements?.length) {
      //   await updateDecorations({
      //     configId: front.id,
      //     decorations: front.decorationElements,
      //   });
      // }

      // if (back?.decorationElements?.length) {
      //   await updateDecorations({
      //     configId: back.id,
      //     decorations: back.decorationElements,
      //   });
      // }

      setStateClear();
      toast({
        title: "Zapisano zmiany",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Błąd podczas zapisywania",
        description: "Spróbuj ponownie później",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isDirty) return null;

  return (
    <Button
      onClick={handleSave}
      className={"fixed bottom-4 right-4 z-50 md:hidden"}
      icon={Save}
    >
      {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
    </Button>
  );
}; 
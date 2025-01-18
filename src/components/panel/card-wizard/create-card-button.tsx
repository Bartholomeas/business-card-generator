'use client';

import { useState } from "react";

import dynamic from "next/dynamic";

import { Button } from "~/components/common";

const CreateCardDialog = dynamic(() => import("./create-card-dialog").then(mod => mod.CreateCardDialog), {
  ssr: false,
});

export const CreateCardButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Utwórz wizytówkę
      </Button>
      <CreateCardDialog open={open} onOpenChange={setOpen} />
    </>
  );
}; 
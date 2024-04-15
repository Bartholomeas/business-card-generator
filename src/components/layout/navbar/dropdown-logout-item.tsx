"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem, useToast } from "~/components/common";

export const DropdownLogoutItem = () => {
  const { toast } = useToast();

  const logoutUser = async () => {
    await signOut().then(() => {
      toast({
        title: "Wylogowano",
        description: "Wylogowanie przebiegło pomyślnie.",
      });
    });
  };

  return (
    <DropdownMenuItem onClick={logoutUser} className="cursor-pointer">
      Wyloguj się
    </DropdownMenuItem>
  );
};
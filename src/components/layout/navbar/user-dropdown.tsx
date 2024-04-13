"use client";

import { signOut } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

import { routes } from "~/routes/routes";
import { api } from "~/providers/trpc-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/common/dropdown-menu";
import { Button } from "~/components/common/button";
import { useToast } from "~/components/common/toast/use-toast";
import { Avatar, AvatarImage } from "~/components/common/avatar";

import { Loader, User } from "lucide-react";

export function UserDropdown() {
  const { data: avatar } = api.user.getAvatar.useQuery(undefined, {
    retry: 2,
    retryDelay: 500,
    onError: err => {
      console.log({ err });
    },
  });
  const { data: profile, isLoading } = api.user.getProfile.useQuery(undefined, {
    retry: 2,
    retryDelay: 500,
  });

  const { toast } = useToast();
  console.log({ avatar });

  const logoutUser = async () => {
    await signOut().then(() => {
      toast({
        title: "Wylogowano",
        description: "Wylogowanie przebiegło pomyślnie.",
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuSeparator className="md:hidden" />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-row-reverse items-center justify-start gap-2 pr-0 md:flex-row md:pt-2"
        >
          <div className="flex flex-col items-end">
            <p className="text-sm text-textPrimary">{profile?.name}</p>
            <p className="text-xs text-textSecondary">{profile?.email}</p>
          </div>

          <Avatar className="h-[30px] w-[30px]">
            <AvatarImage src={avatar?.url} alt={`Awatar użytkownika ${profile?.name}`} />
            <AvatarFallback className="flex items-center justify-center">
              {isLoading ? <Loader className="animate-spin" /> : <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="mt-2 md:hidden"></DropdownMenuItem>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer md:mt-2" asChild>
            <Link href={routes.panel}>Panel użytkownika</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser} className="cursor-pointer">
          Wyloguj się
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
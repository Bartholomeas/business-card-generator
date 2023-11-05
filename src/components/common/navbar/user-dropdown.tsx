import { type Session } from "next-auth";

import { signOut } from "next-auth/react";

import { AvatarFallback } from "@radix-ui/react-avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

import { User } from "lucide-react";

interface Props {
  session: Session;
}

export function UserDropdown({ session }: Props) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-row items-center justify-start gap-2 border-t-[1px] border-t-border pl-0 pt-4 lg:border-none lg:pt-2"
        >
          <Avatar className="h-[30px] w-[30px]">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={`Awatar użytkownika ${session.user.name}`}
            />
            <AvatarFallback className="flex items-center justify-center">
              <User />
            </AvatarFallback>
          </Avatar>
          {session.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Panel użytkownika</DropdownMenuItem>
          <DropdownMenuItem>Ustawienia</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>Wyloguj się</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

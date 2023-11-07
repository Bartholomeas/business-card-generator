import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

import { routes } from "~/misc/routes";

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
      <DropdownMenuSeparator className="lg:hidden" />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-row-reverse items-center justify-start gap-2 pr-0 lg:flex-row lg:pt-2"
        >
          <div className="flex flex-col items-end">
            <p className="text-sm text-textPrimary">{session.user.name}</p>
            <p className="text-xs text-textSecondary">{session.user.email}</p>
          </div>
          <Avatar className="h-[30px] w-[30px]">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={`Awatar użytkownika ${session.user.name}`}
            />
            <AvatarFallback className="flex items-center justify-center">
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="mt-2 lg:hidden"></DropdownMenuItem>
        <DropdownMenuGroup>
          <DropdownMenuItem className="lg:mt-2">
            <Link href={routes.panel}>Panel użytkownika</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>Wyloguj się</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

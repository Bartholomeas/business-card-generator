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

import { api } from "~/trpc/react";
import { User } from "lucide-react";

export function UserDropdown() {
  const { data: user } = api.user.getProfile.useQuery();

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
      <DropdownMenuSeparator className="md:hidden" />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex flex-row-reverse items-center justify-start gap-2 pr-0 md:flex-row md:pt-2"
        >
          <div className="flex flex-col items-end">
            <p className="text-sm text-textPrimary">{user?.name}</p>
            <p className="text-xs text-textSecondary">{user?.email}</p>
          </div>

          <Avatar className="h-[30px] w-[30px]">
            {user?.avatarUrl ? (
              <AvatarImage
                src={user.avatarUrl}
                alt={`Awatar użytkownika ${user?.name}`}
              />
            ) : null}
            <AvatarFallback className="flex items-center justify-center">
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="mt-2 md:hidden"></DropdownMenuItem>
        <DropdownMenuGroup>
          <DropdownMenuItem className="md:mt-2">
            <Link href={routes.panel}>Panel użytkownika</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>Wyloguj się</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

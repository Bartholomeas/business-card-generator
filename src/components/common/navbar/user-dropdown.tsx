import { signOut } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

import { routes } from "~/misc/routes";
import { api } from "~/trpc/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/common/ui/dropdown-menu";
import { Button } from "~/components/common/ui/button";
import { useToast } from "~/components/common/ui/toast/use-toast";
import { Avatar, AvatarImage } from "~/components/common/ui/avatar";

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
            <AvatarImage
              src={user?.avatarUrl ?? undefined}
              alt={`Awatar użytkownika ${user?.name}`}
            />
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

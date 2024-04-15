"use client";

import Link from "next/link";

import dynamic from "next/dynamic";
import { routes } from "~/routes/routes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/common/dropdown-menu";
import { DropdownLogoutItem } from "~/components/layout/navbar/dropdown-logout-item";
import { Button } from "~/components/common";

const NavUserButton = dynamic(() =>
  import("~/components/layout/navbar/nav-user-button").then(mod => mod.NavUserButton),
);

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuSeparator className="md:hidden" />
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <NavUserButton />
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
        <DropdownLogoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
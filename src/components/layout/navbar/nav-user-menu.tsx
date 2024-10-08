"use client";

import * as React from "react";

import { Loader, User } from "lucide-react";

import { api } from "~/providers/trpc-provider";

import { Avatar, AvatarFallback, AvatarImage, Text } from "~/components/common";


export const NavUserMenu = () => {
  const { data: avatar } = api.user.getCurrentUserAvatar.useQuery(undefined, {
    retry: 2,
    retryDelay: 500,
  });
  const { data: profile, isLoading: profileIsLoading } = api.user.getProfile.useQuery(undefined, {
    retry: 2,
    retryDelay: 500,
  });

  return (
    <div className="flex w-full flex-row-reverse items-center justify-between gap-2 pr-0 md:flex-row md:pt-2">
      <div className="flex flex-col items-end">
        <Text size={"sm"} className="text-sm text-textPrimary">
          {profile?.name}
        </Text>
        <Text size={"xs"} color={"secondary"} className="text-xs text-textSecondary">
          {profile?.email}
        </Text>
      </div>

      <Avatar className="size-[30px]">
        <AvatarImage src={avatar?.url} alt={`Awatar użytkownika ${profile?.name}`} />
        <AvatarFallback className="flex items-center justify-center">
          {profileIsLoading ? <Loader className="animate-spin" /> : <User />}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

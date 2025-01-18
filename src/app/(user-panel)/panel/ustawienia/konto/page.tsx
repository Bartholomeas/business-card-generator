import React from "react";

import { api } from "~/trpc/server";

import { Heading, Text } from "~/components/common";
import { Separator } from "~/components/common/separator";
import { ChangeEmailForm } from "~/components/panel/settings/change-email-form";
import { ChangePasswordForm } from "~/components/panel/settings/change-password-form";

const AccountSettingsPage = async () => {
  try {
    const userProfile = await api.user.getProfile.query();

    return (
      <div className="flex w-full flex-col gap-4 space-y-6">
        <ChangeEmailForm userProfile={userProfile} />
        <Separator className="my-8" />
        <ChangePasswordForm />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4">
        <Heading className="text-xl font-semibold">
          Nie udało się załadować ustawień konta
        </Heading>
        <Text className="text-muted-foreground">
          Spróbuj odświeżyć stronę lub zaloguj się ponownie
        </Text>
      </div>
    );
  }
};

export default AccountSettingsPage;

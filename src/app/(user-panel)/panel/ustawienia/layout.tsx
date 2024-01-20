import React, { Suspense, type ReactNode } from "react";
import { type Metadata } from "next";

import { routes } from "~/misc/routes";

import { Separator } from "~/components/common/ui/separator";
import { SettingsSideNav } from "~/components/panel/settings/settings-side-nav";

export const metadata: Metadata = {
  title: "Ustawienia",
  description: "Panel ustawień użytkownika.",
};

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="h-full space-y-4 pb-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Ustawienia i preferencje
          </h2>
          <p className="text-muted-foreground">
            Zarządzaj ustawieniami swojego konta.
          </p>
        </div>
        <Separator />
        <div className="flex h-full flex-col lg:flex-row lg:space-y-0">
          <aside className="flex flex-col flex-nowrap lg:w-1/4 lg:max-w-[300px] lg:flex-row">
            <SettingsSideNav items={sidebarNavItems} />
            <Separator className="my-4 lg:hidden" />
            <Separator
              orientation="vertical"
              className="mx-4 hidden lg:block"
            />
          </aside>
          <div className="flex-1">
            <Suspense>{children}</Suspense>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsLayout;

const sidebarNavItems = [
  {
    title: "Profil",
    href: routes.settingsTabs.profile,
  },
  {
    title: "Konto",
    href: routes.settingsTabs.account,
  },
  {
    title: "Powiadomienia",
    href: routes.settingsTabs.notifications,
  },
];

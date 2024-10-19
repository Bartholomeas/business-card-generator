import React, { type ReactNode, Suspense } from "react";

import dynamic from "next/dynamic";

import { type Metadata } from "next";

import { routes } from "~/routes/routes";

import { Card, Heading, Separator, Text } from "~/components/common";

const SettingsSideNav = dynamic(() => import("~/components/panel/settings/settings-side-nav").then(res => res.SettingsSideNav));


export const metadata: Metadata = {
  title: "Ustawienia",
  description: "Panel ustawień użytkownika.",
};

const SettingsLayout = ({ children }: { children: ReactNode; }) => {
  return (
    <Card className="h-full space-y-4 overflow-hidden rounded-lg bg-background p-4 pb-16">
      <div>
        <Heading type="h2">Ustawienia i preferencje</Heading>
        <Text size="sm" color="muted">
          Zarządzaj ustawieniami swojego konta.
        </Text>
      </div>
      <Separator />
      <div className="flex h-full flex-col lg:flex-row lg:space-y-0">
        <aside className="flex flex-col flex-nowrap lg:w-1/4 lg:max-w-[300px] lg:flex-row">
          <SettingsSideNav items={sidebarNavItems} />
          <Separator className="my-4 lg:hidden" />
          <Separator orientation="vertical" className="mx-4 hidden lg:block" />
        </aside>
        <div className="flex-1">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </Card>
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

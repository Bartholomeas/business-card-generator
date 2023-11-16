import { type Metadata } from "next";
import { headers } from "next/headers";
import { api } from "~/trpc/server";
import { TRPCReactProvider } from "~/trpc/react";
import { SettingsForm } from "~/components/panel/settings/settings-form";
import { Separator } from "~/components/ui/separator";

const Settings = async () => {
  const user = await api.user.getMe.query();
  console.log(user);

  return (
    <TRPCReactProvider headers={headers()}>
      <div className="flex w-full flex-1 flex-col md:flex-row">
        <SettingsForm />
      </div>
    </TRPCReactProvider>
  );
};
export default Settings;

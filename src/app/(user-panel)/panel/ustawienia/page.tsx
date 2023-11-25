import { api } from "~/trpc/server";

import { ImageUploader } from "~/components/common/image-upload/image-uploader";
import { SettingsProfileForm } from "~/components/panel/settings/settings-profile-form";
import { Separator } from "~/components/ui/separator";
import { SettingsCredentialsForm } from "~/components/panel/settings/settings-credentials-form";

export const dynamic = "force-dynamic";

const Settings = async () => {
  const userProfile = await api.user.getProfile.query();

  return (
    <div className="flex w-full flex-col gap-12 space-y-6 lg:flex-row-reverse">
      <ImageUploader />

      <div className="flex w-full flex-col gap-4">
        <SettingsProfileForm user={userProfile} />
        <Separator className="my-8" />
        <SettingsCredentialsForm email={userProfile.email} />
      </div>
    </div>
  );
};

export default Settings;

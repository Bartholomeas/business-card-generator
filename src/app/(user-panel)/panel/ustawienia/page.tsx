import { api } from "~/trpc/server";

import { Separator } from "~/components/ui/separator";
import { ImageUploader } from "~/components/common/image-upload/image-uploader";

import { ChangeProfileDataForm } from "~/components/panel/settings/change-profile-data-form";
import { ChangePasswordForm } from "~/components/panel/settings/change-password-form";
import { ChangeEmailForm } from "~/components/panel/settings/change-email-form";

export const dynamic = "force-dynamic";

const Settings = async () => {
  const userProfile = await api.user.getProfile.query();

  return (
    <div className="flex w-full flex-col gap-12 space-y-6 lg:flex-row-reverse">
      <ImageUploader />

      <div className="flex w-full flex-col gap-4">
        <ChangeProfileDataForm user={userProfile} />
        <Separator className="my-8" />
        <ChangePasswordForm />
        <Separator className="my-8" />
        <ChangeEmailForm userProfile={userProfile} />
      </div>
    </div>
  );
};

export default Settings;

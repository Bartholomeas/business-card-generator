import { api } from "~/trpc/server";

import { ImageUploader } from "~/components/common/image-upload/image-uploader";

import { ChangeProfileDataForm } from "~/components/panel/settings/change-profile-data-form";

export const dynamic = "force-dynamic";

const Settings = async () => {
  const userProfile = await api.user.getProfile.query();

  return (
    <div className="flex w-full flex-col gap-12 space-y-6 lg:flex-row-reverse">
      <ImageUploader />
      <ChangeProfileDataForm user={userProfile} />
    </div>
  );
};

export default Settings;

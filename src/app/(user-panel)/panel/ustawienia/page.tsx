import { api } from "~/trpc/server";

import { ImageUploader } from "~/components/special/image-upload/image-uploader";

import { ChangeProfileDataForm } from "~/components/panel/settings/change-profile-data-form";
import { ChangeCompanyDataForm } from "~/components/panel/settings/change-company-data-form";

export const dynamic = "force-dynamic";

const Settings = async () => {
  // TODO: Handle errors
  const userProfile = await api.user.getProfile().catch(err => {
    console.warn("TO HANDLE", err);
    return undefined;
  });
  const company = await api.user.getUserCompany().catch(err => {
    console.warn("TO HANDLE", err);
    return undefined;
  });

  return (
    <div className="flex w-full flex-col gap-12 space-y-6">
      <ImageUploader />
      <div className={"flex flex-col gap-16"}>
        <ChangeProfileDataForm user={userProfile} />
        <ChangeCompanyDataForm company={company} />
      </div>
    </div>
  );
};

export default Settings;

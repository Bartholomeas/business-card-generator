import { api } from "~/trpc/server";

import { ImageUploader } from "~/components/special/image-upload/image-uploader";

import { ChangeProfileDataForm } from "~/components/panel/settings/change-profile-data-form";
import { ChangeCompanyDataForm } from "~/components/panel/settings/change-company-data-form";

export const dynamic = "force-dynamic";

const Settings = async () => {
  const userProfile = await api.user.getProfile.query();
  const company = await api.user.getUserCompany.query();
  console.log({ company });
  return (
    <div className="flex w-full flex-col gap-12 space-y-6 lg:flex-row-reverse">
      <ImageUploader />
      <div className={"flex flex-col gap-8"}>
        <ChangeProfileDataForm user={userProfile} />
        <ChangeCompanyDataForm company={company} />
      </div>
    </div>
  );
};

export default Settings;
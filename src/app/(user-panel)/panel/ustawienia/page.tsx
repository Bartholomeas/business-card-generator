import dynamic from "next/dynamic";
import { ImageUploader } from "~/components/special/image-upload/image-uploader";

const ChangeProfileDataForm = dynamic(() =>
  import("~/components/panel/settings/change-profile-data-form").then(
    mod => mod.ChangeProfileDataForm,
  ),
);
const ChangeCompanyDataForm = dynamic(() =>
  import("~/components/panel/settings/change-company-data-form").then(
    mod => mod.ChangeCompanyDataForm,
  ),
);

const Settings = () => {
  return (
    <div className="flex w-full flex-col gap-12 space-y-6">
      <ImageUploader />
      <div className={"flex flex-col gap-16"}>
        <ChangeProfileDataForm />
        <ChangeCompanyDataForm />
      </div>
    </div>
  );
};

export default Settings;

import { Suspense } from "react";

import dynamic from "next/dynamic";

import { PageLoader } from "~/components/special/page-loader";

const ImageUploader = dynamic(() => import("~/components/special/image-upload/image-uploader").then(mod => mod.ImageUploader));
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
        <Suspense fallback={<PageLoader />}>
          <ChangeProfileDataForm />
        </Suspense>
        <Suspense fallback={<PageLoader />}>
          <ChangeCompanyDataForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Settings;

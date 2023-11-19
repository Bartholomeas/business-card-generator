import React from "react";

import { ImageUploader } from "~/components/common/image-upload/image-uploader";
import { SettingsProfileForm } from "./settings-profile-form";

export const SettingsForm = () => {
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row-reverse">
      <ImageUploader />
      <SettingsProfileForm />
    </div>
  );
};

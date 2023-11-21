import { ImageUploader } from "~/components/common/image-upload/image-uploader";
import { SettingsProfileForm } from "~/components/panel/settings/settings-profile-form";
import { api } from "~/trpc/server";

const Settings = async () => {
  const user = await api.user.getMe.query();

  return (
    <div className="flex w-full flex-1 flex-col md:flex-row">
      <div className="flex w-full flex-col gap-6 lg:flex-row-reverse">
        <ImageUploader />
        <SettingsProfileForm user={user}/>
      </div>
    </div>
  );
};
export default Settings;

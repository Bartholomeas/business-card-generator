import React from "react";

import { api } from "~/trpc/server";

import { Separator } from "~/components/common/separator";
import { ChangeEmailForm } from "~/components/panel/settings/change-email-form";
import { ChangePasswordForm } from "~/components/panel/settings/change-password-form";


const AccountSettingsPage = async () => {
	const userProfile = await api.user.getProfile.query();

	return (
		<div className="flex w-full flex-col gap-4 space-y-6">
			<ChangeEmailForm userProfile={userProfile} />
			<Separator className="my-8" />
			<ChangePasswordForm />
		</div>
	);
};
export default AccountSettingsPage;

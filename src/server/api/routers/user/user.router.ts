import {
	deleteAvatar,
	getAvatar,
	getCurrentUserAvatar,
	getProfile,
	getUsersBadges,
	getUserCompany,
	signUp,
	updateEmail,
	updatePassword,
	updateUserAvatar,
	updateUserCompany,
	updateUserProfile,
} from "./requests";
import { createTRPCRouter } from "../../trpc";

export const userRouter = createTRPCRouter({
	getProfile,
	getUserCompany,
	getUsersBadges,
	getCurrentUserAvatar,
	getAvatar,
	updatePassword,
	updateEmail,
	updateUserProfile,
	updateUserAvatar,
	updateUserCompany,
	deleteAvatar,
	signUp,
});

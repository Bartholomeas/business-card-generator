import {
	deleteAvatar,
	getAvatar,
	getCurrentUserAvatar,
	getProfile,
	getUsersBadges,
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

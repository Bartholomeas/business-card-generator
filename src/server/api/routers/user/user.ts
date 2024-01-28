import { signUp } from "./requests/sign-up";

import { createTRPCRouter } from "../../trpc";
import {
  deleteAvatar,
  getBusinessCard,
  getProfile,
  getUserCompany,
  updateEmail,
  updatePassword,
  updateUserAvatar,
  updateUserProfile,
} from "./requests";

export const userRouter = createTRPCRouter({
  getBusinessCard,
  getProfile,
  getUserCompany,
  updatePassword,
  updateEmail,
  updateUserProfile,
  updateUserAvatar,
  deleteAvatar,
  signUp,
});

import { signUp } from "./requests/sign-up";

import { createTRPCRouter } from "../../trpc";
import {
  deleteAvatar,
  getAvatar,
  getProfile,
  getUserCompany,
  updateEmail,
  updatePassword,
  updateUserAvatar,
  updateUserCompany,
  updateUserProfile,
} from "./requests";

export const userRouter = createTRPCRouter({
  getProfile,
  getUserCompany,
  getAvatar,
  updatePassword,
  updateEmail,
  updateUserProfile,
  updateUserAvatar,
  updateUserCompany,
  deleteAvatar,
  signUp,
});
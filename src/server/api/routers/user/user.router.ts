import { signUp } from "./requests/sign-up";

import { createTRPCRouter } from "../../trpc";
import {
  deleteAvatar,
  getProfile,
  getUserCompany,
  getAvatar,
  updateEmail,
  updatePassword,
  updateUserAvatar,
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
  deleteAvatar,
  signUp,
});

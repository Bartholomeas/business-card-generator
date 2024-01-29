import { signUp } from "./requests/sign-up";

import { createTRPCRouter } from "../../trpc";
import {
  deleteAvatar,
  getProfile,
  getUserCompany,
  updateEmail,
  updatePassword,
  updateUserAvatar,
  updateUserProfile,
} from "./requests";

export const userRouter = createTRPCRouter({
  getProfile,
  getUserCompany,
  updatePassword,
  updateEmail,
  updateUserProfile,
  updateUserAvatar,
  deleteAvatar,
  signUp,
});

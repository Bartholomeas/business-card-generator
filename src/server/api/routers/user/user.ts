import { signUp } from "./requests/signUp";

import { createTRPCRouter } from "../../trpc";
import {
  deleteAvatar,
  getBusinessCard,
  getProfile,
  updateEmail,
  updatePassword,
  updateUserAvatar,
  updateUserProfile,
} from "./requests";

export const userRouter = createTRPCRouter({
  getBusinessCard,
  getProfile,
  updatePassword,
  updateEmail,
  updateUserProfile,
  updateUserAvatar,
  deleteAvatar,
  signUp,
});

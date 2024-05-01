import { createTRPCRouter } from "../../trpc";
import {
  deleteAvatar,
  getAvatar,
  getCurrentUserAvatar,
  getProfile,
  getUserBadge,
  getUserCompany,
  signUp,
  updateEmail,
  updatePassword,
  updateUserAvatar,
  updateUserCompany,
  updateUserProfile,
} from "./requests";

export const userRouter = createTRPCRouter({
  getProfile,
  getUserCompany,
  getUserBadge,
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
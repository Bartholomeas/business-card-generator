import { getBusinessCard } from "./getBusinessCard";
import { getProfile } from "./getProfile";

import { updatePassword } from "./updatePassword";
import { updateEmail } from "./updateEmail";
import { updateUserProfile } from "./updateUserProfile";
import { updateUserAvatar } from "./updateUserAvatar";

import { deleteAvatar } from "./deleteAvatar";
import { signUp } from "./signUp";

import { createTRPCRouter } from "../../trpc";

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

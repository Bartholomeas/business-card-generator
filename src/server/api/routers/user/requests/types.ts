import { type z } from "zod";
import { type userProfileSchema } from "../userSchemas";

export interface UserProfile extends z.infer<typeof userProfileSchema> {
  email: string;
  avatarUrl: string | null;
}

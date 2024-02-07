import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";
import { type UserProfile } from "../types";

export const getProfile = protectedProcedure.query(async ({ ctx }): Promise<UserProfile> => {
  const { email, avatarId } = ctx.session.user;

  const avatarUrl = await ctx.db.file.findFirst({
    where: { key: avatarId },
    select: { url: true },
  });

  if (!email)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Nie mogliśmy znaleźć obecnie zalogowanego użytkownika.",
    });

  const user = await ctx.db.user.findFirst({
    where: { email },
    include: { userDetails: true },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Użytkownik o tym adresie e-mail nie istnieje.",
    });
  }

  const { name, firstName, lastName, description } = user;

  return {
    name,
    email,
    firstName,
    lastName,
    description,
    avatarUrl: avatarUrl?.url ?? null,
  };
});

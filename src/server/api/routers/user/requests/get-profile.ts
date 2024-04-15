import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import { type UserProfile } from "../user.types";

export const getProfile = protectedProcedure.query(async ({ ctx }): Promise<UserProfile> => {
  const { id, email } = ctx.session.user;

  // const avatarUrl = await ctx.db.file.findFirst({
  //   where: { key: avatarId },
  //   select: { url: true },
  // });
  console.log({ id, email });
  if (!id)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Nie mogliśmy znaleźć obecnie zalogowanego użytkownika.",
    });

  const user = await ctx.db.user.findFirst({
    where: { id },
    include: { userDetails: true },
  });
  console.log({ user });
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
    // avatarUrl: avatarUrl?.url ?? null,
  };
});
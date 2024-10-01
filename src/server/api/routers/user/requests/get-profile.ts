import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import { type UserProfile } from "~/server/api/routers/user";

export const getProfile = protectedProcedure.query(async ({ ctx }): Promise<UserProfile> => {
  try {
    const { id } = ctx.session.user;
    if (!id)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie mogliśmy znaleźć obecnie zalogowanego użytkownika.",
      });

    const user = await ctx.db.user.findFirst({
      where: { id },
      include: { userDetails: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Użytkownik o tym adresie e-mail nie istnieje.",
      });
    }
    const { name, email, firstName, lastName, description } = user;

    return {
      name,
      email,
      firstName,
      lastName,
      description,
      userDetailsId: user?.userDetails?.id,
      // avatarUrl: avatarUrl?.url ?? null,
    };
  } catch (error) {
    console.error("Error in getProfile:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Wystąpił błąd podczas pobierania profilu użytkownika.",
    });
  }
});

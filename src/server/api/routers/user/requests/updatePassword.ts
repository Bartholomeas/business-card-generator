import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";
import { changePasswordSchema } from "../user-schemas";

export const updatePassword = protectedProcedure
  .input(changePasswordSchema)
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx.session;

    if (!user.email)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie mogliśmy znaleźć użytkownika.",
      });

    const userRecord = await ctx.db.user.findFirst({
      where: { email: user.email },
      select: { password: true },
    });

    if (!userRecord?.password) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie mogliśmy znaleźć użytkownika.",
      });
    }

    const passwordsMatches = await bcrypt.compare(
      input.password,
      userRecord?.password,
    );

    if (!passwordsMatches)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Błędne hasło, spróbuj ponownie.",
      });

    const hashedPassword = await bcrypt.hash(input.newPassword, 12);

    await ctx.db.user.update({
      where: { email: user.email },
      data: { password: hashedPassword },
    });
  });

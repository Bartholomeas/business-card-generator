import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";
import { changeEmailSchema } from "../userSchemas";

export const updateEmail = protectedProcedure
  .input(changeEmailSchema)
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

    await ctx.db.user.update({
      where: { email: user.email },
      data: { email: input.email },
    });
  });

import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";

export const getAvatar = protectedProcedure.query(async ({ ctx }) => {
  const { avatarId } = ctx.session.user;
  try {
    const avatar = await ctx.db.file.findFirst({
      where: { key: avatarId },
      select: {
        id: true,
        url: true,
      },
    });
    console.log({ avatar });
    if (!avatar)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Awatar użytkownika nie został znaleziony.",
      });
    return avatar;
  } catch (err: unknown) {
    if (err instanceof TRPCError) throw err;
  }
});
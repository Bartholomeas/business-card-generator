import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";

export const getAvatar = protectedProcedure.query(async ({ ctx }) => {
  const { avatarId } = ctx.session.user;
  const avatar = await ctx.db.file.findFirst({
    where: { key: avatarId },
  });

  if (!avatar) throw new TRPCError({ code: "NOT_FOUND" });
  return avatar;
});

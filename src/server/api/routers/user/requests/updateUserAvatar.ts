import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { utapi } from "~/app/api/uploadthing/core";

export const updateUserAvatar = protectedProcedure
  .input(z.object({ key: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const { email } = ctx.session.user;

    if (email) {
      const user = await ctx.db.user.findFirst({
        where: { email },
        select: { avatarId: true },
      });

      const oldFileKey = user?.avatarId;

      await ctx.db.user
        .update({
          where: { email },
          data: {
            avatarId: input.key,
          },
        })
        .then(async () => {
          if (oldFileKey) {
            await utapi.deleteFiles(oldFileKey);
            await ctx.db.file.deleteMany({ where: { key: oldFileKey } });
          }
        });
    }
  });

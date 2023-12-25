import { protectedProcedure } from "../../../trpc";
import { userProfileSchema } from "../userSchemas";

export const updateUserProfile = protectedProcedure
  .input(userProfileSchema)
  .mutation(async ({ ctx, input }) => {
    const user = ctx.session.user;
    const { name, firstName, lastName, description } = input;

    if (user.email)
      return await ctx.db.user.update({
        where: {
          email: user.email,
        },
        data: {
          name,
          firstName,
          lastName,
          description,
        },
      });
  });

import { protectedProcedure } from "../../../trpc";

export const updateUserCompany = protectedProcedure.input().mutation(async ({ ctx, input }) => {
  const { id } = ctx.session.user;
  return true;
  // return ctx.db.user.update({
  //   where: {
  //     id,
  //   },
  //   data: input,
  // });
});
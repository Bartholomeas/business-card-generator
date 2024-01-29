import { type Company } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";

export const getUserCompany = protectedProcedure.query(async ({ ctx }): Promise<Company> => {
  const { id, email } = ctx.session.user;

  const user = await ctx.db.user.findFirst({
    where: {
      OR: [{ email: email ?? undefined }, { id }],
    },
    select: {
      userDetails: {
        select: {
          company: true,
        },
      },
    },
  });

  if (!user)
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Nie mogliśmy znaleźć użytkownika.",
    });

  const { company } = user?.userDetails as { company: Company };

  return company;
});

import bcrypt from "bcrypt";

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";

import { signUpSchema, userSettingsSchema } from "./userSchemas";

import { type UserProfile } from "./types";

export const userRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ ctx }): Promise<UserProfile> => {
    const email = ctx.session.user.email;

    if (!email)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Nie mogliśmy znaleźć obecnie zalogowanego użytkownika.",
      });

    const user = await ctx.db.user.findFirst({
      where: { email },
      include: { companyDetails: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Użytkownik o tym adresie e-mail nie istnieje.",
      });
    }

    const { name, description, avatarUrl } = user;

    return { name, email, description, avatarUrl };
  }),
  updateUserProfile: protectedProcedure
    .input(userSettingsSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      console.log({ user, input });

      await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...input,
        },
      });
    }),

  updateAvatar: protectedProcedure
    .input(z.object({ imgId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      await ctx.db.user.update({
        where: { id: user.id },
        data: {
          avatarUrl: input.imgId,
        },
      });
    }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password, passwordConfirm, policyAgree } = input;

      const userExists = await ctx.db.user.findUnique({
        where: { email },
      });

      if (password !== passwordConfirm)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Hasła do siebie nie pasują.",
        });

      if (!policyAgree)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Zgoda jest wymagana.",
        });

      if (!!userExists)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Użytkownik o tym adresie e-mail już istnieje.",
        });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await ctx.db.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "Pomyślnie utworzono konto.",
        result: result,
      };
    }),
});

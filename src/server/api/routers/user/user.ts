import bcrypt from "bcrypt";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";

import {
  changeEmailSchema,
  changePasswordSchema,
  signUpSchema,
  userProfileSchema,
} from "./userSchemas";

import { utapi } from "~/app/api/uploadthing/core";
import { type UserProfile } from "./types";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(
    async ({ ctx }): Promise<UserProfile> => {
      const { email, avatarId } = ctx.session.user;

      const avatarUrl = await ctx.db.file.findFirst({
        where: { key: avatarId },
        select: { url: true },
      });

      if (!email)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Nie mogliśmy znaleźć obecnie zalogowanego użytkownika.",
        });

      const user = await ctx.db.user.findFirst({
        where: { email },
        include: { company: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Użytkownik o tym adresie e-mail nie istnieje.",
        });
      }

      const { name, firstName, lastName, description } = user;

      return {
        name,
        email,
        firstName,
        lastName,
        description,
        avatarUrl: avatarUrl?.url ?? null,
      };
    },
  ),

  // checkPasswordIsCorrect: protectedProcedure
  //   .input(z.object({ password: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const { user } = ctx.session;

  //     if (!user.email)
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Nie mogliśmy znaleźć użytkownika.",
  //       });

  //     const userRecord = await ctx.db.user.findFirst({
  //       where: { email: user.email },
  //       select: { password: true },
  //     });

  //     if (!userRecord?.password) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Nie mogliśmy znaleźć użytkownika.",
  //       });
  //     }

  //     const passwordsMatches = await bcrypt.compare(
  //       input.password,
  //       userRecord?.password,
  //     );

  //     return passwordsMatches;
  //   }),
  updatePassword: protectedProcedure
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
    }),

  updateEmail: protectedProcedure
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
    }),

  updateUserProfile: protectedProcedure
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
    }),

  updateUserAvatar: protectedProcedure
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
    }),

  deleteAvatar: protectedProcedure.mutation(async ({ ctx }) => {
    const email = ctx.session.user.email;
    const { avatarId } = ctx.session.user;

    const file = await ctx.db.file.findFirst({
      where: { key: avatarId },
    });

    if (file) {
      await ctx.db.file.delete({ where: { id: file.id } });
      await utapi.deleteFiles(file.key);
    }

    if (email)
      await ctx.db.user.update({
        where: { email },
        data: {
          avatarId: null,
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

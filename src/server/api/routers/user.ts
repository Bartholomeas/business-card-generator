import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { loginSchema, signUpSchema } from "./schemas/user";

export const userRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    if (!email || !password)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Nie ma użytkownika o tym adresie e-mail.",
      });
    const user = await ctx.db.user.findUnique({ where: { email } });

    if (!user)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Nie ma użytkownika o tym adresie e-mail.",
      });

    const passwordsMatching = await bcrypt.compare(password, user.password);

    if (!passwordsMatching)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Niepoprawne hasło.",
      });

    // const loginCredentials = await signIn("credentials", {
    //   email,
    //   password,
    // });
    // console.log(loginCredentials);

    return user;
  }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email, password, passwordConfirm } = input;

      const userExists = await ctx.db.user.findUnique({
        where: { email },
      });

      if (password !== passwordConfirm)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Hasła do siebie nie pasują.",
        });

      if (!!userExists)
        throw new TRPCError({
          code: "CONFLICT",
          message: "Użytkownik o tym adresie e-mail już istnieje.",
        });

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await ctx.db.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Pomyślnie utworzono konto.",
        result: result.email,
      };
    }),
});

// export const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(4).max(12),
// });

// export const signUpSchema = loginSchema.extend({
//   username: z.string(),
// });

// export type ILogin = z.infer<typeof loginSchema>;
// export type ISignUp = z.infer<typeof signUpSchema>;

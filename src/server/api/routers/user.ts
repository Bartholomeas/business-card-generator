import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { loginSchema, signUpSchema } from "./schemas/user";

export const userRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    console.log(input);
    // return await ctx.db.user.create({
    //   data: input,
    // });
    // return ctx.db.user.create({

    // });

    return await ctx.db.user.findFirst({ where: { email: input.email } });
  }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, password, passwordConfirm } = input;

      const userExists = await ctx.db.user.findFirst({ where: { email } });
      console.log(userExists);

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

      // const passwordsMatching = await bcrypt.compare(password, passwordConfirm);

      // if (password !== passwordConfirm)
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Hasła się nie zgadzają",
      //   });

      // const hashedPassword = await bcrypt.hash(password, 12);

      const result = await ctx.db.user.create({
        data: {
          email,
          // firstName,
          // lastName,
          // password: hashedPassword,
        },
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

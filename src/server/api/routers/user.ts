import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(
      z.object({
        // firstName: z.string(),
        // lastName: z.string(),
        email: z.string(), //isEmail
        // password: z.string(),
        // passwordConfirm: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      return await ctx.db.user.create({
        data: input,
      });
      // return ctx.db.user.create({

      // });
    }),
  signUp: publicProcedure
    .input(
      z.object({
        // firstName: z.string(),
        // lastName: z.string(),
        email: z.string(), //isEmail
        // password: z.string(),
        // passwordConfirm: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      console.log("pacz");
      // const userExists = await ctx.db.user.findFirst({ where: { email } });

      // if (userExists)
      //   throw new TRPCError({
      //     code: "CONFLICT",
      //     message: "Użytkownik o tym adresie e-mail już istnieje.",
      //   });

      // const passwordsMatching = await bcrypt.compare(password, passwordConfirm);

      // if (password !== passwordConfirm)
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Hasła się nie zgadzają",
      //   });

      // const hashedPassword = await bcrypt.hash(password, 12);

      const result = await ctx.db.user.create({
        data: {
          email: "sdsds@open.pl",
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

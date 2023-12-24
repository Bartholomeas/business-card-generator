import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../trpc";
import { signUpSchema } from "./userSchemas";

export const signUp = publicProcedure
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
  });

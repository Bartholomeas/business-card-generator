import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "E-mail jest wymagany." })
    .email("Niepoprawny email"),
  password: z.string().min(8, "Hasło musi mieć przynajmniej 8 znaków."),
});

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "To pole nie może być puste." })
      .min(2, "Nazwa musi mieć conajmniej 2 znaki."),
    email: z
      .string({ required_error: "To pole nie może być puste." })
      .email("Niepoprawny adres e-mail."),
    password: z
      .string({ required_error: "To pole nie może być puste." })
      .min(8, "Hasło musi mieć conajmniej 8 znaków."),
    passwordConfirm: z.string({
      required_error: "To pole nie może być puste.",
    }),
    policyAgree: z
      .boolean({
        required_error:
          "Potwierdź, że zapoznałeś się z naszą polityką i zgadzasz się z jej warunkami.",
      })
      .default(false),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Hasła się różnią.",
    path: ["passwordConfirm"],
  });

// import { z } from "zod";

// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // simulate a slow db call

//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           content: "",
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(({ ctx }) => {
//     return ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });

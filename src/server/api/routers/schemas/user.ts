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
      .string({ required_error: "Nazwa jest wymagana." })
      .min(2, "Nazwa musi mieć conajmniej 2 znaki."),
    email: z
      .string({ required_error: "E-mail jest wymagany." })
      .email("Niepoprawny adres e-mail."),
    password: z.string().min(8, "Hasło musi mieć conajmniej 8 znaków."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Hasła się różnią.",
    path: ["passwordConfirm"],
  });

import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "E-mail jest wymagany." })
    .email("Niepoprawny email"),
  password: z.string().min(8, "Hasło musi mieć przynajmniej 8 znaków."),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string({ required_error: "Imie jest wymagane." })
      .min(2, "Imie musi mieć conajmniej 2 znaki."),
    lastName: z
      .string({ required_error: "Nazwisko jest wymagane." })
      .min(2, "Nazwisko musi mieć conajmniej 2 znaki."),
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

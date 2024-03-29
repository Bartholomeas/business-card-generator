import { z } from "zod";
import { PASSWORD_REGEX } from "~/misc/constants";

const PASSWORD_MIN_LENGTH_MESSAGE = "Hasło musi mieć conajmniej 8 znaków.";
const CANNOT_BE_EMPTY_MESSAGE = "To pole nie może być puste.";

export const loginSchema = z.object({
  email: z.string({ required_error: "E-mail jest wymagany." }).email("Niepoprawny email"),
  password: z.string().min(8, "Hasło musi mieć przynajmniej 8 znaków."),
});

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: CANNOT_BE_EMPTY_MESSAGE })
      .min(2, "Nazwa musi mieć conajmniej 2 znaki."),
    email: z.string({ required_error: CANNOT_BE_EMPTY_MESSAGE }).email("Niepoprawny adres e-mail."),
    password: z
      .string({ required_error: CANNOT_BE_EMPTY_MESSAGE })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
    passwordConfirm: z.string({
      required_error: CANNOT_BE_EMPTY_MESSAGE,
    }),
    policyAgree: z
      .boolean({
        required_error:
          "Potwierdź, że zapoznałeś się z naszą polityką i zgadzasz się z jej warunkami.",
      })
      .default(false),
  })
  .refine(({ password }) => PASSWORD_REGEX.test(password), {
    message: "Hasło musi posiadać conajmniej jedną liczbę, wielką literę oraz znak specjalny.",
    path: ["password"],
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Hasła się różnią.",
    path: ["passwordConfirm"],
  });

export const userProfileSchema = z.object({
  name: z
    .string({ required_error: CANNOT_BE_EMPTY_MESSAGE })
    .min(2, "Nazwa musi mieć conajmniej 2 znaki."),
  firstName: z.string().min(2, "Imie musi mieć conajmniej 2 znaki.").nullable(),
  lastName: z.string().min(2, "Nazwisko musi mieć conajmniej 2 znaki.").nullable(),
  description: z.string().nullable(),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: CANNOT_BE_EMPTY_MESSAGE,
      })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
    newPassword: z
      .string({
        required_error: CANNOT_BE_EMPTY_MESSAGE,
      })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
    newPasswordConfirm: z
      .string({
        required_error: CANNOT_BE_EMPTY_MESSAGE,
      })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
  })
  .refine(({ newPassword }) => PASSWORD_REGEX.test(newPassword), {
    message: "Hasło musi posiadać conajmniej jedną liczbę, wielką literę oraz znak specjalny.",
    path: ["newPassword"],
  })
  .refine(({ newPassword, newPasswordConfirm }) => newPassword === newPasswordConfirm, {
    message: "Hasła się różnią.",
    path: ["newPassword"],
  });

export const changeEmailSchema = z.object({
  email: z.string({ required_error: "E-mail jest wymagany." }).email("Niepoprawny email"),
  password: z.string({
    required_error: CANNOT_BE_EMPTY_MESSAGE,
  }),
});

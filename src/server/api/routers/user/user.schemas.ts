import { z } from "zod";
import { PASSWORD_REGEX } from "~/misc/constants";
import { getRequiredMessage } from "~/misc";

const PASSWORD_MIN_LENGTH_MESSAGE = "Hasło musi mieć conajmniej 8 znaków.";

export const loginSchema = z.object({
  email: z.string({ required_error: getRequiredMessage("E-mail") }).email("Niepoprawny email"),
  password: z.string().min(8, "Hasło musi mieć przynajmniej 8 znaków."),
});

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: getRequiredMessage("Nazwa") })
      .min(2, "Nazwa musi mieć conajmniej 2 znaki."),
    email: z
      .string({ required_error: getRequiredMessage("E-mail") })
      .email("Niepoprawny adres e-mail."),
    password: z
      .string({ required_error: getRequiredMessage("Hasło") })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
    passwordConfirm: z.string({
      required_error: getRequiredMessage("Potwierdzenie hasła"),
    }),
    policyAgree: z
      .boolean({
        required_error: getRequiredMessage("Zgoda na politykę"),
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
    .string({ required_error: getRequiredMessage("Nazwa") })
    .min(2, "Nazwa musi mieć conajmniej 2 znaki."),
  firstName: z.string().min(2, "Imie musi mieć conajmniej 2 znaki.").nullable(),
  lastName: z.string().min(2, "Nazwisko musi mieć conajmniej 2 znaki.").nullable(),
  description: z.string().nullable(),
});
export const changePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: getRequiredMessage("Aktualne hasło"),
      })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
    newPassword: z
      .string({
        required_error: getRequiredMessage("Nowe hasło"),
      })
      .min(8, PASSWORD_MIN_LENGTH_MESSAGE),
    newPasswordConfirm: z
      .string({
        required_error: getRequiredMessage("Potwierdzenie nowego hasła"),
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
  email: z.string({ required_error: getRequiredMessage("E-mail") }).email("Niepoprawny email"),
  password: z.string({
    required_error: getRequiredMessage("Hasło"),
  }),
});

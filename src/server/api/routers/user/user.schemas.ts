import { z } from "zod";
import { PASSWORD_REGEX, POSTAL_CODE_REGEX } from "~/misc/constants";

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

export const userCompanySchema = z.object({
  companyName: z
    .string({ required_error: "Nazwa firmy" })
    .min(2, "Nazwa firmy musi mieć conajmniej 2 znaki"),
  ownerName: z
    .string()
    .min(2, "Imię i nazwisko właściciela musi mieć conajmniej 2 znaki.")
    .nullable(),
  nip: z
    .string({ required_error: "Numer NIP" })
    .min(10, "NIP musi mieć conajmniej 10 cyfr.")
    .max(16, "NIP może mieć maksymalnie 16 cyfr.")
    .nullable(),
  regon: z.string().nullable(),
  phoneNumber: z
    .string({})
    .min(9, "Numer telefonu musi mieć conajmniej 9 znaków")
    .refine(val => !isNaN(Number(val.replace(/ +/g, ""))))
    .nullable(),
  email: z.string({ required_error: "E-mail" }).email("Niepoprawny email").nullable(),
  website: z.string().nullable(),
  addressLine1: z.string().nullable(),
  addressLine2: z.string().nullable(),
  city: z.string().nullable(),
  postalCode: z
    .string()
    .min(6, "Kod pocztowy musi mieć conajmniej 5 znaków")
    .refine(val => POSTAL_CODE_REGEX.test(val), {
      message: "Kod pocztowy jest w niepoprawnym formacie.",
      path: ["zipPostalCode"],
    })
    .nullable(),
  state: z.string().nullable(),
  country: z.string().nullable().default("pl"),
});

export const changeEmailSchema = z.object({
  email: z.string({ required_error: "E-mail jest wymagany." }).email("Niepoprawny email"),
  password: z.string({
    required_error: CANNOT_BE_EMPTY_MESSAGE,
  }),
});
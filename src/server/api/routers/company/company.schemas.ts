import { z } from "zod";

import { getRequiredMessage, POSTAL_CODE_REGEX } from "~/misc";

export const userCompanySchema = z.object({
	companyName: z
		.string({ required_error: getRequiredMessage("Nazwa firmy") })
		.min(2, "Nazwa firmy musi mieć conajmniej 2 znaki")
		.nullable(),
	slug: z.string().min(2, "Slug podstrony musi mieć conajmniej 2 znaki").nullable(),
	ownerName: z
		.string()
		.min(2, "Imię i nazwisko właściciela musi mieć conajmniej 2 znaki.")
		.nullable(),
	nip: z
		.string({ required_error: getRequiredMessage("Numer NIP") })
		.min(10, "NIP musi mieć conajmniej 10 cyfr.")
		.max(16, "NIP może mieć maksymalnie 16 cyfr.")
		.nullable(),
	regon: z.string().nullable(),
	phoneNumber: z
		.string({})
		.min(9, "Numer telefonu musi mieć conajmniej 9 znaków")
		.refine(val => !isNaN(Number(val.replace(/ +/g, ""))))
		.nullable(),
	email: z
		.string({ required_error: getRequiredMessage("E-mail") })
		.email("Niepoprawny email")
		.nullable(),
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

export const addCommentInputSchema = z.object({
	content: z.string(),
	commentsSectionId: z.string().optional(),
});

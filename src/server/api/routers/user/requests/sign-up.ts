import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

import { sendEmail } from "~/app/actions/send-email";

import { publicProcedure } from "~/server/api/trpc";

import { signUpSchema } from "../user.schemas";

export const signUp = publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
	try {
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

		if (userExists)
			throw new TRPCError({
				code: "CONFLICT",
				message: "Użytkownik o tym adresie e-mail już istnieje.",
			});

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await ctx.db.$transaction(async db => {
			const user = await db.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			const userDetails = await db.userDetails.create({
				data: {
					userId: user.id,
				},
			});

			const userBusinessCard = await db.businessCard.create({
				data: {
					front: { create: { styles: {}, textElements: { create: [] } } },
					back: { create: { styles: {}, textElements: { create: [] } } },
					generalStyles: {},
					defaultTextElements: { create: [] },
					qrLink: "",
				},
			});

			const userCompany = await db.company.create({
				data: {
					companyName: "",
					slug: crypto.randomUUID(),
					ownerName: "",
					nip: "",
					regon: "",
					phoneNumber: "",
					email: "",
					city: "",
					addressLine1: "",
					state: "",
					country: "",
					isPublished: false,
					companyPage: {
						create: {
							sections: { create: [] },
						},
					},
				},
			});

			await db.businessCard.update({
				where: {
					id: userBusinessCard.id,
				},
				data: {
					company: {
						connect: {
							id: userCompany.id,
						},
					},
				},
			});

			await db.userDetailsOnCompany.create({
				data: {
					userDetailsId: userDetails.id,
					companyId: userCompany.id,
				},
			});

			return user;
		});

		await sendEmail({
			email: process.env.GMAIL_USER ?? "",
			sendTo: email,
			subject: "Witaj w naszym serwisie!",
			html: `
              <h1>Witaj ${name}!</h1>
              <p>Dziękujemy za rejestrację w serwisie Kwirk.</p>
              <p>Możesz teraz zalogować się i rozpocząć korzystanie z naszych usług.</p>
            `,
		}).catch(err => {
			console.log("Sending registration email failed: ", err);
		});

		return {
			status: 201,
			message: "Pomyślnie utworzono konto.",
			result,
		};
	} catch (error) {
		if (error instanceof TRPCError) {
			throw error;
		}
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "An unexpected error occurred",
		});
	}
});

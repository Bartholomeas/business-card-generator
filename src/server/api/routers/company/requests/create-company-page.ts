import { randomUUID } from "crypto";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

export const createCompanyPage = protectedProcedure
	.input(z.object({}))
	.mutation(async ({ ctx }) => {
		const { id } = ctx.session.user;

		try {
			const userDetails = await ctx.db.userDetails.findFirst({
				where: { userId: id },
				select: {
					id: true,
					user: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});

			if (!userDetails) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Nie znaleziono profilu użytkownika",
				});
			}

			return await ctx.db.$transaction(async db => {
				// 1. Create new company
				const company = await db.company.create({
					data: {
						companyName: `Firma ${userDetails.user.name}`,
						slug: randomUUID(),
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
						// Connect company with user details
						usersDetails: {
							create: {
								userDetailsId: userDetails.id,
							},
						},
					},
				});

				// 2. Create sections
				const faqSection = await db.faqSection.create({
					data: {
						title: "Częste pytania",
						items: {
							create: [
								{
									title: "Co oferujemy?",
									content: "Oferujemy ..",
								},
								{
									title: "Jaka gwarancja obowiązuje?",
									content: "Gwarancja ..",
								},
								{
									title: "W jaki sposób wyceniacie usługę?",
									content: "Wycena ..",
								},
							],
						},
					},
				});

				const opinionsSection = await db.opinionsSection.create({
					data: {
						title: "Opinie użytkowników",
						items: {
							create: [
								{
									content: "Super firma, polecam",
									userDetails: {
										connect: {
											id: userDetails.id,
										},
									},
								},
							],
						},
					},
				});

				const commentsSection = await db.commentsSection.create({
					data: {
						title: "Komentarze",
						items: {
							create: [],
						},
					},
				});

				// 3. Create company page and connect all sections
				const companyPage = await db.companyPage.create({
					data: {
						company: {
							connect: {
								id: company.id,
							},
						},
						sections: {
							create: [
								{
									sectionType: "faqSection",
									faqSection: {
										connect: {
											id: faqSection.id,
										},
									},
								},
								{
									sectionType: "opinionsSection",
									opinionsSection: {
										connect: {
											id: opinionsSection.id,
										},
									},
								},
								{
									sectionType: "commentsSection",
									commentsSection: {
										connect: {
											id: commentsSection.id,
										},
									},
								},
							],
						},
					},
				});

				return { company, companyPage };
			});
		} catch (err) {
			if (err instanceof TRPCError) throw err;

			console.error("Error creating company page:", err);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Wystąpił błąd podczas tworzenia strony firmowej.",
			});
		}
	});

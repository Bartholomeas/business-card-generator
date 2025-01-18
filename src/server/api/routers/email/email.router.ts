import nodemailer from "nodemailer";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD,
	},
});

const emailSchema = z.object({
	to: z.string().email(),
	subject: z.string(),
	html: z.string(),
});

export const emailRouter = createTRPCRouter({
	sendEmail: protectedProcedure.input(emailSchema).mutation(async ({ input }) => {
		const { to, subject, html } = input;

		console.log("Sending email... ", { to, subject, html });

		const mailOptions = {
			from: process.env.GMAIL_USER,
			to,
			subject,
			html,
		};

		try {
			await transporter.sendMail(mailOptions);
			return { success: true };
		} catch (error) {
			console.error("Error sending email:", error);
			return { success: false, error };
		}
	}),
});

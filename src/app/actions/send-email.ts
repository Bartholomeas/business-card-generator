"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	service: "gmail",
	port: 587,
	secure: true,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_APP_PASSWORD,
	},
});

interface SendEmailParams {
	email: string;
	sendTo?: string;
	subject: string;
	html?: string;
}

export async function sendEmail({ email, sendTo, subject, html }: SendEmailParams) {
	try {
		await transporter.verify();
	} catch (error) {
		console.error("Something Went Wrong", error);
		return;
	}

	const info = {
		from: email,
		to: sendTo,
		subject: subject,
		html: html ? html : "",
	};

	await transporter.sendMail(info);
	return { success: true };
}

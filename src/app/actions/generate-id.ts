"use server";

import { randomBytes } from "crypto";

export async function generateId() {
	return randomBytes(16).toString("hex");
}

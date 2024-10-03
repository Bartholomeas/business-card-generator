"use client";

import { redirect } from "next/navigation";

import { signOut } from "next-auth/react";

import { routes } from "~/routes/routes";

import { DropdownMenuItem, useToast } from "~/components/common";


export const DropdownLogoutItem = () => {
	const { toast } = useToast();

	const logoutUser = async () => {
		await signOut().then(() => {
			toast({
				title: "Wylogowano",
				description: "Wylogowanie przebiegło pomyślnie.",
			});
			redirect(routes.home);
		});
	};

	return (
		<DropdownMenuItem onClick={logoutUser} className="cursor-pointer">
			Wyloguj się
		</DropdownMenuItem>
	);
};

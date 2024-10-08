"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, type SignInResponse } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "~/providers/trpc-provider";

import { changeEmailSchema } from "~/server/api/routers/user/user.schemas";
import { type UserProfile } from "~/server/api/routers/user/user.types";

import { Button } from "~/components/common/button";
import { useToast } from "~/components/common/toast/use-toast";
import { Form } from "~/components/form/form";
import { Input } from "~/components/form/input";


type UserEmailChange = z.infer<typeof changeEmailSchema>;

interface Props {
	userProfile: UserProfile;
}

export const ChangeEmailForm = ({ userProfile }: Props) => {
	const { toast } = useToast();

	const utils = api.useUtils();

	const { data, refetch } = api.user.getProfile.useQuery(undefined, {
		initialData: userProfile,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const form = useForm<UserEmailChange>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: { email: data?.email, password: undefined },
	});

	useEffect(() => {
		form.reset({ email: data?.email ?? undefined, password: undefined });
	}, [data]);

	const { mutate, isLoading } = api.user.updateEmail.useMutation({
		onSuccess: async () => {
			await signIn("credentials", {
				email: form.getValues("email"),
				password: form.getValues("password"),
				redirect: false,
			}).then((value: SignInResponse | undefined) => {
				if (value?.ok) {
					toast({
						title: "Pomyślnie zmieniono adres e-mail",
						description: "Od tego momentu loguj się nowym adresem e-mail.",
					});
				}
				if (value?.error) {
					toast({
						title: "Wystąpił błąd",
						description: "Nie mogliśmy zmienić adresu e-mail.",
						variant: "destructive",
					});
				}
			});

			await utils.user.getProfile.invalidate();
			await utils.user.getProfile.refetch();
			await refetch();
		},
		onError: () => {
			toast({
				title: "Wystąpił błąd",
				description: "Nie mogliśmy zmienić adresu e-mail.",
				variant: "destructive",
			});
		},
	});

	const onSubmit = (values: UserEmailChange) => {
		mutate(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
				<Input label="E-mail" name="email" type="email" placeholder="E-mail" />
				<div className="flex flex-col gap-4 sm:flex-row">
					<Input label="Podaj swoje hasło" name="password" type="password" placeholder="********" />
				</div>
				<Button variant={"primary"} type="submit" className="self-end" isLoading={isLoading}>
					Zmień e-mail
				</Button>
			</form>
		</Form>
	);
};
